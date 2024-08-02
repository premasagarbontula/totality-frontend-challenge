import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  //Gutters(gx,gy) are the padding between your columns, used to responsively space and align content in the Bootstrap grid system.
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row d-flex">
          {categories?.map((c) => (
            <div className="col-md-3" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-primary mt-5 mb-3 fs-3"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
