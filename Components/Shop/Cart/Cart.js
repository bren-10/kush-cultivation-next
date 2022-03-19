import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Image from 'next/image'
import {toast} from "react-toastify";

function Cart(props) {
  const formRef = useRef()
  const buttonRef = useRef()
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [cartItems, setCartItems] = useState({
    isLoading: true,
    data: "",
  });
  const [subTotal, setSubTotal] = useState(0);

  const fetchOptions = {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    body: ''
  }

  async function onCheckOut() {
    const response = await fetch('/api/user')
    if (response.ok) {
      const data = await response.json()
      formRef.current[0].value = `${data['user'][0]["firstName"]} ${data['user'][0]["lastName"]}`
      formRef.current[1].value = data['user'][0]["email"]
      formRef.current[2].value = JSON.stringify(cartItems.data)
      buttonRef.current.click()
    } else {
      toast.error(<p>Something went wrong retrieving user info.<Link href="/contact"><a className="nav-link">contact</a></Link> us.</p>)
    }
  }

  async function sendOrderRequest(e){
    // e.preventDefault()
    // let options = fetchOptions
    // // let clonedForm = structuredClone(formRef)
    // // let payload = {
    // //   'cl_name': formRef.current[0].value,
    // //   'to_email': formRef.current[1].value,
    // //   'items': formRef.current[2].value
    // // }
    // const formData = new FormData(formRef.current)
    // options.body = formData
    // const response = await fetch('/api/order-email', options)
    // if (response.ok) {
    //   const data = await response.json()
    //   console.log(data)
    // } else {
    //   toast.error("Something went wrong with the order request. Please contact us.")
    // }
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

  function onClearCart() {
    let response = window.confirm("Are you sure you want to clear your cart?");
    if (response) {
      localStorage.removeItem("kush-cultivation__cartItems");
      setCartItems({
        ...cartItems,
        data: "",
      });
    }
    props.changeCartCount()
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

      <form ref={formRef}>
        <input hidden type="text" name="cl_name"/>
        <input hidden type="text" name="to_email"/>
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

export default Cart;
