import "../styles/globals.css";
import "../styles/Carousel.css";
import "../styles/Cart.css";
import "../styles/ContactUs.css";
import "../styles/Footer.css";
import "../styles/Gallery.css";
import "../styles/GalleryImage.css";
import "../styles/ItemCard.css";
import "../styles/KushNavbar.css";
import "../styles/LoginRegister.css";
import "../styles/MainLayout.css";
import "../styles/ReadMoreModal.css";
import "../styles/ResetPassword.css";
import "../styles/Shop.css";
import "../styles/SplashPage.css";
import "../styles/Visit.css";
import "../styles/Admin.css";
import 'react-toastify/dist/ReactToastify.css';
import KushNavbar from "../Components/Navigation/Navbar/KushNavbar";
import Footer from "../Components/Footer/Footer";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { Fragment, useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [faviconScheme, setFaviconScheme] = useState("/k-light.png");
  const [hasVisitedState, setHasVisitedState] = useState(false);
  const [cartCount, setCartCount] = useState('')
  
  function changeCartCount(){
    const cartItems = JSON.parse(localStorage.getItem('kush-cultivation__cartItems'))
    if (cartItems){
      setCartCount(cartItems.length)
    } else {
      setCartCount('')
    }
  }

  // Change favicon colour based on browser/OS theme.
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (isDark.matches) {
      setFaviconScheme("/k.png");
    }
  }, []);

  // Check if user has visited the site before and set visit status accordingly.
  useEffect(() => {
    const hasVisited = localStorage.getItem("kush-cultivation__hasVisited") ? true : false;
    if (hasVisited) {
      setHasVisitedState(true);
    } else {
      localStorage.setItem("kush-cultivation__hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    changeCartCount()
  }, [])
  
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href={faviconScheme} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link rel="stylesheet" href="./index.html" /> */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <title>Kush Cultivation</title>
      </Head>
      {/* <body> */}
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossOrigin="anonymous"
        ></script>
        {hasVisitedState && <KushNavbar cartCount={cartCount} thereIsUser={pageProps.user}/>}
        <ToastContainer theme={"dark"}/>
        <Component {...pageProps} hasVisited={hasVisitedState} setVisited={() => setHasVisitedState(true)} changeCartCount={changeCartCount}/>
        {hasVisitedState && <Footer />}
      {/* </body> */}
    </Fragment>
  );
}