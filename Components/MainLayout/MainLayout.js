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

  function Category() {
    let { category } = useParams();

    return <Shop category={category} cartCount={getCartCount} />;
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
        <KushNavbar cartCount={cartItemCount}></KushNavbar>
        <Switch>
          <Route exact path="/">
            <Carousel></Carousel>
            <Visit></Visit>
            <ContactUs></ContactUs>
          </Route>

          <Route path="/gallery">
            <Gallery></Gallery>
          </Route>

          <Route path="/shop/:category">
            <Category />
          </Route>

          <Route path="/cart">
            {/* {authCtx.isLoggedIn ? (
              <Cart cartCount={getCartCount} />
            ) : (
              <Redirect to="/user-authentication" />
            )} */}
          </Route>

          {/* {!authCtx.isLoggedIn && (
            <Route path="/user-authentication">
              <LoginRegister />
            </Route>
          )} */}

          <Route path="/reset-password">
            <ResetPassword />
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default MainLayout;
