import Image from "next/image";
import Link from "next/link";
import React from "react";

import { urlFor } from "@/lib/client";

const HeroBanner = ({ heroBanner }) => {
  /* img sanity src */
  const src = urlFor(heroBanner.image).url();

  return (
    <div className="hero-banner-container">
      <div className="">
        <p className="beats-solo">{heroBanner.smallText} </p>
        <h3>{heroBanner.midText} </h3>
        <h1>{heroBanner.largeText1} </h1>

        <Image
          loader={() => src}
          src={src}
          alt="headphones"
          className="hero-banner-image"
          width={300}
          objectFit="cover"
          height={300}
        />

        <div className="">
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText} </button>
          </Link>
          <div className="desc">
            <h5>For You</h5>
            <p>{heroBanner.desc} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
