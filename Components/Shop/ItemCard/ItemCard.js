import { FaShoppingCart } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

function ItemCard(props) {
  // const alert = useAlert();
  const [priceOption, setPriceOption] = useState('')

  function selectPriceOption(e) {
    const priceList = props.completeItem["priceList"];
    if (e) {
      setPriceOption({
        selectedOption: e.target.value,
        price: priceList[e.target.value]
      });
    } else {
      setPriceOption({
        selectedOption: Object.keys(priceList)[1],
        price: priceList[Object.keys(priceList)[1]]
      });
    }
  }

  function addToCart() {
    let cartData = JSON.parse(localStorage.getItem("kush-cultivation__cartItems"));
    if (!cartData) {
      cartData = [];
    }

    let itemToAdd = {
      itemName: props.completeItem.name,
      selectedOption: priceOption.selectedOption,
      price: props.completeItem['priceList']['standAlone'] || priceOption.price,
      qty: 1
    };

    cartData.push(itemToAdd);
    localStorage.setItem("kush-cultivation__cartItems", JSON.stringify(cartData));
    props.changeCartCount()
    toast.success("Item added to cart!")
  }

  useEffect(() => {
    selectPriceOption('')
  }, [])

  return (
    <div>
      <div className="item-card">
        <div className="card mb-3">
          <div className="row">
            <div className="col-md-4">
              <img
                src={props.completeItem['image']}
                className="card-img"
                alt={props.completeItem["name"]}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{props.completeItem["name"]}</h5>
                <h5 className="card-title price d-inline">
                  R
                  {props.completeItem["priceList"]["standAlone"] ||
                    priceOption.price}
                </h5>
                {!props.completeItem["priceList"]["standAlone"] && (
                  <select className="select-option" onChange={selectPriceOption}>
                    {Object.keys(props.completeItem["priceList"]).map(
                      (option, i) =>
                        option !== "standAlone" && (
                          <option
                            key={i}
                            style={{ backgroundColor: "#3d3d3d" }}
                            value={option}
                          >
                            {option}
                          </option>
                        )
                    )}
                  </select>
                )}
                <span className="stock">
                  {props.completeItem["stock"] ? (
                    <span>Stock: {props.completeItem["stock"]}</span>
                  ) : (
                    <span style={{ color: "red" }}>Out of stock.</span>
                  )}
                </span>
                <hr></hr>
                <p className="card-text">
                  {props.completeItem["description"].length > 210
                    ? `${props.completeItem["description"].substring(0, 210)}...`
                    : props.completeItem["description"]}
                </p>
                <div style={{ position: "absolute", bottom: "1rem" }}>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() =>
                      props.onReadMore(
                        props.completeItem["name"],
                        `${props.completeItem["description"]}\n\n${props.completeItem["readMore"]} Dimensions: ${props.completeItem["dimensions"]}`
                      )
                    }
                  >
                    Read More
                  </button>
                </div>
                <div style={{ position: "absolute", bottom: "1rem", right: "0" }}>
                  <button
                    className="btn btn-light float-right"
                    onClick={addToCart}
                  >
                    <FaShoppingCart className="to-cart" />
                    <ImPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
