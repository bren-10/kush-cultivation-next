import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";


function Cart(props) {
  const [cartItems, setCartItems] = useState({
    isLoading: true,
    data: "",
  });

  const [subTotal, setSubTotal] = useState(0);

  function onCheckOut() {
    console.log("Check me out");
  }

  function onQtyChange(e, i) {
    cartItems.data[i] = {
      ...cartItems.data[i],
      qty: parseInt(e.target.value) || "",
    };
    localStorage.setItem("cartItems", JSON.stringify(cartItems.data));
    setCartItems({
      ...cartItems,
      data: cartItems.data,
    });
  }

  function handleDeleteItem(i) {
    cartItems.data.splice(i, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems.data));
    let cartItemCount = JSON.parse(localStorage.getItem("cartItems")).length;
    props.cartCount(cartItemCount)
    setCartItems({
      ...cartItems,
      data: cartItems.data.length > 0 ? cartItems.data : '',
    });
  }

  function onClearCart() {
    let response = window.confirm("Are you sure you want to clear your cart?");
    if (response) {
      localStorage.removeItem("cartItems");
      props.cartCount(0)
      setCartItems({
        ...cartItems,
        data: "",
      });
    }
  }

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
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
  }, [cartItems.data]);

  return (
    <div className="cart-component">
      <h1>My Cart</h1>
      {cartItems.isLoading ? (
        <img
          className="loadingator"
          src="/assets/loading.gif"
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
