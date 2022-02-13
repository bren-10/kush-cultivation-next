import { useState, useReducer, useRef } from 'react'
import toast from 'react-nextjs-toast';

export default function Admin() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [pricelist, setPricelist] = useState([])
  const [uploadedImage, setUploadedImage] = useState('')
  const categoryRef = useRef('')
  const itemNameRef = useRef('')
  const stockCountRef = useRef(1)
  const shDescRef = useRef('')
  const lnDescRef = useRef('')
  const dimensionsRef = useRef('')
  const stdaPriceRef = useRef('')

  function handleAddPrice(){
    let obj = pricelist
    obj.push({
      "Description": 'Item Description Here',
      "Cost": 0
    })
    setPricelist(obj)
    forceUpdate()
  }

  function handleDeletePrice(index){
    let obj = pricelist
    obj.splice(index, 1)
    setPricelist(obj)
    forceUpdate()
  }

  // Source: https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  function handleImageUpload(e){
    let binaryData = []
    binaryData.push(e.target.files[0])
    let imgURL = window.URL.createObjectURL(new Blob(binaryData))

    toDataURL(imgURL, function(dataUrl) {
      let base64Only = dataUrl.substring(dataUrl.indexOf(",") + 1)
      setUploadedImage(base64Only)
    })
  }

  function handlePostToMongo(){
    
  }

  function handlePriceListField(){

  }


  return (
    <div className="admin">
      <h1>Admin Page</h1>
        <h3>Add an item</h3>

        <h5>Category</h5>
        <small>
          The description of the main category (Eg. Plant Propagation, Growing Mediums and Soil)<br/>
          Try to keep it short (4 or less words). Capitalize every word that isn't "and"/"of"/"or" etc.
        </small>
        <input type="text" maxLength={25} ref={categoryRef}/>

        <h5>Item Name</h5>
        <small>The name you want displayed for the item</small>
        <input type="text" ref={itemNameRef}/>

        <h5>Stock Count</h5>
        <small>Add your stock count for this item./</small>
        <input type="number" ref={stockCountRef}/>

        <h5>Short description</h5>
        <small>
          Example: "The Humidity Dome is perfect for Germinating or Propagating. Comes with 4 x 6 cell seedling trays."<br/>
          Around 15-20 words is fine.
        </small>
        <input type="text" ref={shDescRef}/>

        <h5>Long description</h5>
        <small>
          This text will show when the user clicks the "Read More" button on an item. No length limit, make it descriptive.
        </small>
        <input type="text" ref={lnDescRef}/>

        <h5>Dimensions</h5>
        <small>
          Self-explanatory. Add in any format you want.
        </small>
        <input type="text" ref={dimensionsRef}/>

        <h5>Price (Standalone)</h5>
        <small>
          If the item is sold as a whole, i.e. no sizes etc, add a price here. Otherwise leave 0 or empty.
        </small>
        <input type="number" ref={stdaPriceRef}/>

        <h5>Pricelist</h5>
        <small>
          If the item is sold in different sizes, e.g. "6 plug tray", "12 plug tray" etc, add descriptions and prices here.
        </small>
        <div className="price-list">
          {pricelist && pricelist.map((item, i) => (
            <div key={i} className='mt-3'>
              <>Item {i+1}</>
              <input type="text" placeholder={item.Description} onChange={handlePriceListField}/>
              <input type="number" placeholder={item.Cost} onChange={handlePriceListField}/>
              <button className='btn btn-sm btn-danger' onClick={() => handleDeletePrice(i)}>Delete Item {i + 1}</button>
              <hr/>
            </div>

          ))}
          <button className='btn btn-sm btn-light mt-2' onClick={handleAddPrice}>Add list item</button>
        </div>

        <h5>Upload An Image</h5>
        <small>Try limit file size to below 5mb, otherwise it's going to load slowly. Anything over 16mb might crash your database.</small>
        <div className='file'>
          <input type="file" name="my image" onChange={handleImageUpload}/>
        </div>
        
        {uploadedImage && 
          <img src={`data:image/png;base64,${uploadedImage}`} className="uploaded-img"/>
        }

        <button className='btn btn-lg btn-primary' onClick={handlePostToMongo}>Add Item</button>


        {/* ================================================================== */}

        {/* <h3>Edit item</h3>

        <h5>Category</h5>
        <small>
          The description of the main category (Eg. Plant Propagation, Growing Mediums and Soil)<br/>
          Try to keep it short (4 or less words). Capitalize every word that isn't "and"/"of"/"or" etc.
        </small>
        <input type="text" maxLength={25}/>

        <h5>Item Name</h5>
        <small>The name you want displayed for the item</small>
        <input type="text" />

        <h5>Stock</h5>
        <small>Desc here</small>
        <input type="text" />

        <h5>Category</h5>
        <small>Desc here</small>
        <input type="text" /> */}

    </div>
  )
}
