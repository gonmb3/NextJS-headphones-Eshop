import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [showCart, setShowCart] = useState();

  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantities, setTotalQuantities] = useState(0);

  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  /*increase and decrease qty in cart component*/
  const toggleCartItemsQuntity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    let newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, qty: foundProduct.qty + 1 },
      ]);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQty) => prevTotalQty + 1);
    } else if (value == "dec") {
      if (foundProduct.qty > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, qty: foundProduct.qty - 1 },
        ]);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQty) => prevTotalQty - 1);
      }
    }
  };

  /*remove  product from cart*/
  const removeFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.qty
    );
    setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.qty);
    setCartItems(newCartItems);
  };

  /*increase qty*/
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  /*decrease qty*/
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  /*add to cart */
  const addToCart = (product, qty) => {
    const productExist = cartItems.find((item) => item._id === product._id);

    /*total price state*/
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
    /*total quanities state*/
    setTotalQuantities((prevTotalQty) => prevTotalQty + qty);


    /*if exist  */
    if (productExist) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            qty: cartProduct.qty + qty,
          };
      });
      setCartItems(updateCartItems);
      /*else */
    } else {
      product.qty = qty;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} - ${product.name} added to the cart.`);
  };

  return (
    <StateContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        addToCart,
        toggleCartItemsQuntity,
        removeFromCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider };

export default StateContext;

/* hook */
export const useStateContext = () => {
  return useContext(StateContext);
};
