import Link from "next/link"
import {AiOutlineShopping} from "react-icons/ai"
import Cart from "../cart/Cart"
import { useStateContext } from '@/context/StateContext';



const NavBar = () => {

  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
          <Link href="/">
          GZM Headphones   
          </Link>  
      </p>
      
      <button 
      onClick={() => setShowCart(true) }
      className="cart-icon"> 
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities} </span>
      </button>

     {
      showCart &&  <Cart/>
     }
    </div>
  )
}

export default NavBar