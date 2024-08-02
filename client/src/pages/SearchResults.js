import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/Layout/Layout";

const SearchResults = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length === 0
              ? "No Products Found"
              : `${values?.results.length} Products Found`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-image/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={"180px"}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>

                  <p className="fw-light">Rs {p.description}</p>
                  <p className="fw-bold fs-5">₹ {p.price} Lakhs</p>
                </div>
                <div className="mb-3 ms-2 d-flex justify-content-center">
                  <button className="btn btn-primary me-2">More Details</button>
                  <button className="btn btn-secondary ms-2">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
