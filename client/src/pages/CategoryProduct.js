import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container mt-3">
        <h1 className="text-center">Category : {category?.name}</h1>
        <h2 className="text-center">{products?.length} results found</h2>

        <div className="row d-flex flex-wrap justify-content-center">
          {products?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-image/${p._id}`}
                className="card-img-top"
                alt={p.name}
                height={"200px"}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{p.name}</h5>
                </div>
                <p className="fw-light">Rs {p.description}</p>
                <p className="fw-bold fs-5">₹ {p.price} Lakhs</p>
              </div>
              <div className="mb-3 ms-2 d-flex justify-content-center">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary ms-2">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
