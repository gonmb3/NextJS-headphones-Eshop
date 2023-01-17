import { useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { client, urlFor } from "@/lib/client";
import Product from "@/components/product/Product";
import { useStateContext } from "@/context/StateContext";

const ProductDetails = ({ product, products }) => {

  const [index, setIndex] = useState(0);

  /* context */ 
  const {decQty, incQty, qty , addToCart} = useStateContext();

  const { image, name, details, price } = product;


  return (
    <Layout title="Product Info">
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={urlFor(image && image[index]).url()}
              alt="headphones"
              className="product-detail-image"
              width={400}
              height={400}
            />

            <div className="small-image-container">
              {image?.map((item, i) => (
                <Image
                  key={i}
                  src={urlFor(item).url()}
                  alt="headphones"
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  width={80}
                  height={80}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details} </p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span  
              onClick={ decQty}
              className="minus">
                <AiOutlineMinus />
              </span>

              <span className="num">{qty} </span>

              <span
              onClick={ incQty}
               className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
            onClick={() => addToCart(product, qty) }
             className="add-to-cart">Add to Cart</button>

            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>
      {/* MAYLIKE SECTION*/}
      <div className="maylike-products-wrapper">
        <h2>Uou May Also Like</h2>
        {/* scrolling*/}
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "product"]{
      slug{
        current
      }
  }
  `;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
}

export default ProductDetails;
