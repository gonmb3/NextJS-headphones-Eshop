import FooterBanner from "@/components/footer/FooterBanner";
import HeroBanner from "@/components/heroBanner/HeroBanner";

import Layout from "@/components/layout/Layout";

import { client } from "@/lib/client";
import React from "react";
import Product from "./../components/product/Product";

const Home = ({products, bannerData}) => {
  

  return (
    <Layout title="Home">
      {/* banner component */}
      <HeroBanner  heroBanner = { bannerData.length && bannerData[0] } />

  
      <div className="products-heading">
        <h2> Best Products </h2>
        <p>Lorem Sed ut perspiciatis, unde omnis.</p>
      </div>

      <div className="products-container">
        {/* product component */}
        {products?.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>

      <FooterBanner  footerBanner ={ bannerData.length && bannerData[0]}/>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props:{
      products,
      bannerData
    }
  }
}

export default Home;
