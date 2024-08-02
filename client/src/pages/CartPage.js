import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import EmptyCartPage from "./EmptyCartPage";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * 100000;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-2 mt-3">
              {`${auth?.token && `Hello ${auth?.user?.name}`}`}
            </h1>
            <h4 className="text-center mb-4">
              {cart?.length !== 0 ? (
                `You have ${cart.length} items in your cart. ${
                  auth?.token ? "" : "Please Login to checkout"
                }`
              ) : (
                <EmptyCartPage />
              )}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 d-flex flex-column align-items-center">
            {cart?.map((p) => (
              <div
                className="row card d-flex flex-row p-3 mb-2 align-items-center"
                style={{ width: "85%" }}
              >
                <div className="col-md-3">
                  <img
                    src={`/api/v1/product/product-image/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="col-md-5 p-3">
                  <h4>{p.description}</h4>
                </div>
                <div className="col-md-3 p-3">
                  <p className="fw-bold fs-5">Rs {p.price} Lakhs</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            {cart?.length !== 0 && (
              <>
                <h2>Cart Summary</h2>
                <p className="fs-5">Total | Checkout | Payment</p>
                <hr />
                <h4>Order Total : {totalPrice()}</h4>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-5 mt-4">
                      <h4>Current Address : </h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-warning mt-2"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-5 mt-2">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart", //defines which page to navigate after login
                          })
                        }
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="btn btn-primary mb-5"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
