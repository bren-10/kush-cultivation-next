import KushNavbar from "../Navigation/Navbar/KushNavbar";
import Carousel from "./Carousel/Carousel";
import Visit from "./Visit/Visit";
import Footer from "../Footer/Footer";
import Gallery from "../Gallery/Gallery";
import Shop from "../Shop/Shop";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Redirect,
} from "react-router-dom";
import Cart from "../Shop/Cart/Cart";
import { useEffect, useState } from "react";
import LoginRegister from "../Authentication/LoginRegister/LoginRegister";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
// import AuthContext from "../Storage/auth-context";
import ContactUs from "./ContactUs/ContactUs";

function MainLayout() {
  const [cartItemCount, setCartItemCount] = useState(0);
  // const authCtx = useContext(AuthContext);
  function getCartCount(cartItemCount) {
    setCartItemCount(cartItemCount);
  }

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      setCartItemCount(cartItems.length);
    } else {
      setCartItemCount(0);
    }
  }, []);

  return (
    <Router>
      <div className="main-layout">
        
        <Carousel></Carousel>
        <Visit></Visit>
        <ContactUs></ContactUs>

      </div>
    </Router>
  );
}

export default MainLayout;
