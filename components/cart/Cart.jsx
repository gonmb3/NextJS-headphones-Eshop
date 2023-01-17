import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";

import { urlFor } from "@/lib/client";

import axios from "axios";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  /* context hook */
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemsQuntity,
    removeFromCart,
  } = useStateContext();

  /* CHECKOUT WITH STRIPE*/

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const resp = await axios.post("/api/stripe", {
      cartItems: cartItems,
    });

    const result = stripe.redirectToCheckout({
      sessionId: resp.data.id,
    });

    if (result.err) {
      console.log(result.err.message);
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        {/* show cart */}
        <button onClick={() => setShowCart(false)} className="cart-heading">
          <AiOutlineLeft />
          <span className="heading">Close</span>
          <span className="cart-num-items">({totalQuantities} items) </span>
        </button>
        {/*if cart is empty */}
        {cartItems < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={160} />
            <h3>Empty Cart</h3>
            <Link href="/">
              <button className="btn" onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* else, show items in cart */}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <Image
                  width={120}
                  height={120}
                  objectFit="fill"
                  src={urlFor(item?.image[0]).url()}
                  alt="cart-img"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4> {item.price}</h4>
                  </div>

                  {/* increase decrease quantity */}
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          onClick={() =>
                            toggleCartItemsQuntity(item._id, "dec")
                          }
                          className="minus"
                        >
                          <AiOutlineMinus />
                        </span>

                        <span className="num">{item.qty} </span>

                        <span
                          onClick={() =>
                            toggleCartItemsQuntity(item._id, "inc")
                          }
                          className="plus"
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item)}
                      className="remove-item"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* TOTAL*/}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button onClick={handleCheckout} className="btn">
                PAY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
