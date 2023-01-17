import Link from "next/link";
import Image from "next/image";

import { urlFor } from "@/lib/client";

const Product = ({ product }) => {
  const { image, name, slug, price } = product;

  /* img sanity src */
  const src = urlFor(image && image[0]).url();

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            loader={() => src}
            src={src}
            alt="headphones"
            className="product-image"
            width={250}
            height={250}
          />
        <p className="product-name">{name} </p>
        <p className="product-price">${price} </p>

        </div>
      </Link>
    </div>
  );
};

export default Product;
