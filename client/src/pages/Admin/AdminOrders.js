import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
const { Option } = Select;

const AdminOrders = () => {
  const [status, useStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]); // from enum of ordermodel

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3 mt-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mt-3 mb-2">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div
                      className="row card d-flex flex-row p-3 align-items-center"
                      style={{ width: "50%" }}
                    >
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-image/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className="col-md-8 p-3">
                        <h4>{p.name}</h4>

                        {/* <p className="fs-5">{p.description}</p> */}
                        <p className="fw-bold fs-5">Rs {p.price} Lakhs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
