import Cart from '../Components/Shop/Cart/Cart'
import emailjs from '@emailjs/browser';
import { withIronSessionSsr } from "iron-session/next";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Image from 'next/image'
import {toast} from "react-toastify";
import { useRouter } from 'next/dist/client/router';

export default function cart(props) {
  const router = useRouter()
  const formRef = useRef()
  const buttonRef = useRef()
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [cartItems, setCartItems] = useState({
    isLoading: true,
    data: "",
  });
  const [subTotal, setSubTotal] = useState(0);

  async function onCheckOut() {
    const response = await fetch('/api/user')
    if (response.ok) {
      const data = await response.json()
      let theItems = "<div style='margin: 0 auto'><table border='0' cellspacing='0' cellpadding='0'><thead><tr><th style='padding: 7px; border: 1px solid black'>Item</th><th style='padding: 7px; border: 1px solid black'>Qty</th><th style='padding: 7px; border: 1px solid black'>Price</th></tr></thead><tbody>"
      // Break down cart items
      cartItems.data.forEach(item => {
        theItems += `<tr><td style='padding: 7px; border: 1px solid black'>${item.itemName}</td><td style='padding: 7px; border: 1px solid black'>${item.qty}</td><td style='padding: 7px; border: 1px solid black'>R${item.price}</td></tr>`
      })

      theItems += "</tbody></table></div>"

      formRef.current[0].value = `${data['user'][0]["firstName"]} ${data['user'][0]["lastName"]}`
      formRef.current[1].value = data['user'][0]["email"]
      formRef.current[2].value = theItems
      buttonRef.current.click()
    } else {
      toast.error(<p>Something went wrong retrieving user info. Please <Link href="/contact"><a className="nav-link">contact</a></Link> us.</p>)
    }
  }

  async function sendOrderRequest(e){
    e.preventDefault()
    // Send to client
    emailjs.sendForm('service_zljq91s', 'template_7x6ryx5', formRef.current, 'user_uOBFW9NrPRSxzOUxEq3V7')
    .then(() => {
      toast.success("Order placed! Please check your mail.")
      clearCart()
      router.replace('/')
    }, (error) => {
      console.log(error)
      toast.error(<p>Something went wrong with your order request. Please <Link href="/contact"><a className="nav-link">contact</a></Link> us.</p>)
    });
    // Send to company
    emailjs.sendForm('service_zljq91s', 'template_d3y09wm', formRef.current, 'user_uOBFW9NrPRSxzOUxEq3V7')
    .then(() => {
      // ?
    }, (error) => {
      // ?
    });
  }

  function onQtyChange(e, i) {
    cartItems.data[i] = {
      ...cartItems.data[i],
      qty: parseInt(e.target.value) || "",
    };
    localStorage.setItem("kush-cultivation__cartItems", JSON.stringify(cartItems.data));
    setCartItems({
      ...cartItems,
      data: cartItems.data,
    });
  }

  function handleDeleteItem(i) {
    cartItems.data.splice(i, 1);
    localStorage.setItem("kush-cultivation__cartItems", JSON.stringify(cartItems.data));
    setCartItems({
      ...cartItems,
      data: cartItems.data.length > 0 ? cartItems.data : '',
    });
    props.changeCartCount()
  }

  function clearCart() {
    localStorage.removeItem("kush-cultivation__cartItems");
    setCartItems({
      ...cartItems,
      data: "",
    });
    props.changeCartCount()
  }

  function onClearCart(){
    let response = window.confirm("Do you want to clear your cart?");
    if (response) {
      clearCart()
    }
  }

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("kush-cultivation__cartItems"));
    if (cartItems) {
      setCartItems({
        isLoading: false,
        data: cartItems,
      });
    } else {
      setCartItems({
        ...cartItems,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    let tot = 0;
    cartItems.data &&
      cartItems.data.map((item) => {
        tot += parseInt(item["price"] * item["qty"]);
      });
    setSubTotal(tot.toFixed(2));
    forceUpdate()
  }, [cartItems]);

  return (
    <div className="cart-component">

      <form ref={formRef} onSubmit={sendOrderRequest}>
        <input hidden type="text" name="cl_name"/>
        <input hidden type="text" name="cl_email"/>
        <input hidden type="text" name="items"/>
        <input ref={buttonRef} hidden type="submit" value="Send" />
      </form>

      <h1>My Cart</h1>
      {cartItems.isLoading ? (
        <img
          className="loadingator"
          src="/loading.gif"
          alt="Loading"
        ></img>
      ) : cartItems.data && cartItems.data.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th className="qty text-center">Qty</th>
                <th className="item">Item</th>
                <th className="ea text-center">Each</th>
                <th className="tot text-center">Amount</th>
                <th className="tot text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.data.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="number"
                      className="qty-input"
                      value={item["qty"]}
                      onChange={(event) => onQtyChange(event, i)}
                    ></input>
                  </td>
                  <td>
                    {item["itemName"]}{" "}
                    {item["selectedOption"] && `(${item["selectedOption"]})`}
                  </td>
                  <td>R{item["price"]}</td>
                  <td className="price">R{item["price"] * item["qty"]}</td>
                  <td>
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteItem(i)}
                    />
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: "3px solid white" }}>
                <td></td>
                <td></td>
                <td>Subtotal:</td>
                <td>R{subTotal}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button
              className="btn btn-sm btn-light float-left"
              style={{ fontWeight: "600" }}
              onClick={onClearCart}
            >
              Clear All
            </button>
            <button
              className="btn btn-lg btn-success float-right"
              onClick={onCheckOut}
            >
              Check Out
            </button>
          </div>
        </div>
      ) : (
        <h4 className="text-center">No items to display :(</h4>
      )}
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login"
        },
        props:{},
      };
    }

    return {
      props: {
        user: user,
      },
    };
  },
  {
    cookieName: "kush_cookie",
    password: process.env.COOKIE_PW,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: !process.env.NEXT_PUBLIC_IN_PRODUCTION,
    },
  },
);