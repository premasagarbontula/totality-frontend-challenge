import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Our Company"}>
      <div className="row about-us">
        <div className="col-md-6 text-center">
          <img
            src="/images/about-us-img.png"
            className="about-img"
            alt="aboutus-image"
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark text-white text-center mb-3 p-1">ABOUT US</h1>
          <p className="about-line">
            India’s most innovative real estate advertising platform for
            homeowners, landlords, developers, and real estate brokers. The
            company offers listings for new homes, resale homes, rentals, plots
            and co-living spaces in India. Backed by strong research and
            analytics, the company’s experts provide comprehensive real estate
            services that cover advertising and marketing, sales solutions for
            real estate developers, personalized search, virtual viewing,
          </p>
          <p className="about-line mt-1">
            Our vision is changing the way India experiences property. And our
            mission is to be the first choice of our consumers and partners in
            discovering, renting, buying, selling, financing a home, and
            digitally enabling them throughout their journey. We do that with
            data, design, technology, and above all, the passion of our people
            while delivering value to our shareholders.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
