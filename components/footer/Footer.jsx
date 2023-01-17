import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai"

const Footer = () => {

    const year = new Date().getFullYear()

  return (
    <div className="footer-container"> 
          <p>{year} - GZM Headphones  All Rights Reserved </p>
          <p className="icons">
            <AiFillInstagram/>

            <AiOutlineTwitter/>
          </p>
    </div>
  )
}

export default Footer