import { FaShoppingCart } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import Image from 'next/image'
import ImageGallery from "react-image-gallery";
import Popup from "reactjs-popup";

function ItemCard(props) {
  // const alert = useAlert();
  const [priceOption, setPriceOption] = useState('')
  const [showGallery, setShowGallery] = useState(false)
  const [galleryItems, setGalleryItems] = useState('')
  function selectPriceOption(e) {
    if (props.completeItem.priceStandalone) {
      return
    }
    const priceList = props.completeItem["priceMulti"];
    if (e) {
      priceList.forEach(item => {
        if (item["Description"] === e.target.value) {
          setPriceOption({
            selectedOption: item["Description"],
            price: item["Cost"]
          });
        }
      })
      
    } else {
      setPriceOption({
        selectPriceOption: priceList[0]["Description"],
        price: priceList[0]["Cost"]
      })
    }
  }

  function addToCart() {
    let cartData = JSON.parse(localStorage.getItem("kush-cultivation__cartItems"));
    if (!cartData) {
      cartData = [];
    }

    let itemToAdd = {
      itemName: props.completeItem.itemName,
      selectedOption: priceOption.selectedOption,
      price: props.completeItem.priceStandalone || priceOption.price,
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

  useEffect(() => {
    let items = []
    props.completeItem.images.forEach(image => {
      let objToSet = {
        "thumbnail": `data:image;base64,${image}`,
        "original": `data:image;base64,${image}`,
      }
      items.push(objToSet)
    })
    setGalleryItems(items)
  }, [])

  return (
    <div>
      <Popup open={showGallery} onClose={() => setShowGallery(!showGallery)}>
        <ImageGallery items={galleryItems}/>
      </Popup>
      <div className="item-card">
        <div className="card mb-3">
          <div className="row">
            <div className="col-md-4 img-container">
              <img
                src={`data:image/png;base64,${props.completeItem.images[0]}`}
                className="card-img"
                alt={props.completeItem["itemName"]}
                onClick={() => setShowGallery(true)}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{props.completeItem["itemName"]}</h5>
                <h5 className="card-title price d-inline">
                  R
                  {props.completeItem["priceStandalone"] ||
                    priceOption.price}
                </h5>
                {!props.completeItem["priceStandalone"] && (
                  <select className="select-option" onChange={selectPriceOption}>
                    {props.completeItem["priceMulti"].map(
                      (option, i) =>
                        (
                          <option
                            key={i}
                            style={{ backgroundColor: "#3d3d3d" }}
                            value={option["Description"]}
                          >
                            {option["Description"]}
                          </option>
                        )
                    )}
                  </select>
                )}
                <span className="stock">
                  {props.completeItem.stockCount ? (
                    <span>Stock: {props.completeItem.stockCount}</span>
                  ) : (
                    <span>Stock: On Request</span> 
                    // style={{ color: "red" }}
                  )}
                </span>
                <hr></hr>
                <p className="card-text">
                  {props.completeItem.shortDescription}
                </p>
                <div style={{ position: "absolute", bottom: "1rem" }}>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() =>
                      props.onReadMore(
                        props.completeItem["itemName"],
                        props.completeItem.longDescription,
                        props.completeItem.dimensions
                      )
                    }
                  >
                    Read More
                  </button>
                </div>
                <div style={{ position: "absolute", bottom: "1rem", right: "35px" }}>
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
