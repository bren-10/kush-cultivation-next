import { useState, useReducer, useRef, useEffect } from 'react'
import { toast } from "react-toastify";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Admin() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [pricelist, setPricelist] = useState([])
  const [uploadedImages, setUploadedImages] = useState([''])
  const [editType, setEditType] = useState('Add')
  const [showPopup, setShowPopup] = useState('None')
  const categoryRef = useRef('')
  const itemNameRef = useRef('')
  const stockCountRef = useRef(0)
  const shDescRef = useRef('')
  const lnDescRef = useRef('')
  const dimensionsRef = useRef('')
  const stdaPriceRef = useRef('')
  const itemSearchRef = useRef('')
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: ''
  }

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

  function handleImageUpload(e, index){
    let binaryData = []
    binaryData.push(e.target.files[0])
    let imgURL = window.URL.createObjectURL(new Blob(binaryData))

    toDataURL(imgURL, function(dataUrl) {
      let base64Only = dataUrl.substring(dataUrl.indexOf(",") + 1)
      let prev = uploadedImages
      prev[index] = base64Only
      prev.push('')
      setUploadedImages(prev)
      forceUpdate()
    })
  }

  async function handlePostToMongo(){
    if (editType === "Add" || editType === "Edit"){
      if (
        categoryRef.current.value &&
        itemNameRef.current.value &&
        // stockCountRef.current.value && 
        shDescRef.current.value &&
        lnDescRef.current.value &&
        dimensionsRef.current.value && 
        (stdaPriceRef.current.value || pricelist.length > 0) && 
        (uploadedImages[0] !== '')
      ){

        uploadedImages.pop()
      
        let objToPost = {
          "category": categoryRef.current.value,
          "itemName": itemNameRef.current.value,
          "stockCount": stockCountRef.current.value,
          "shortDescription": shDescRef.current.value,
          "longDescription": lnDescRef.current.value,
          "dimensions": dimensionsRef.current.value,
          "priceStandalone": stdaPriceRef.current.value,
          "priceMulti": pricelist,
          "images": uploadedImages
        }
        let options = fetchOptions
        options.body = JSON.stringify(objToPost)
        const response = await fetch(`/api/edit_catalogue/${editType === 'Add' ? 'addItem' : 'editItem'}`, options)
        if (response.ok) {
          const data = await response.json()
          toast.success(`Successfully ${editType === 'Add' ? 'added' : 'edited'} item!`)
          clearFields()
        } else {
          toast.error('Something went wrong, contact Brendan.')
        }

      } else {
        toast.warn("Please make sure you've supplied all the information.")
      }
    } else {
      // Handle delete
    }
    
  }

  function handlePriceListField(event, index, type){
    let prev = pricelist
    let value = event.target.value
    if (type === 'Cost'){
      parseInt(value)
    }
    prev[index][type] = value
    setPricelist(prev)
    forceUpdate()
  }

  function popuplateEditTemplate(item){
    categoryRef.current.value = item.category
    itemNameRef.current.value = item.itemName
    stockCountRef.current.value = item.stockCount
    shDescRef.current.value = item.shortDescription
    lnDescRef.current.value = item.longDescription
    dimensionsRef.current.value = item.dimensions
    stdaPriceRef.current.value = item.priceStandalone
    setPricelist(item.priceMulti)
    setUploadedImages(item.images)
    forceUpdate()
  }

  async function deleteItem(){
    let options = fetchOptions
    options.body = JSON.stringify(itemSearchRef.current.value)
    const response = await fetch('/api/edit_catalogue/deleteItem', options)
    if (response.ok) {
      const data = await response.json() // For when needed
      toast.success("Successfully removed that item.")
    } else {
      toast.error("Something went wrong trying to delete this item.")
    }
  }

  async function onSearchItem(){
    let options = fetchOptions
    options.body = JSON.stringify(itemSearchRef.current.value)
    const response = await fetch('/api/search_catalogue', options)
    if (response.ok){
      const data = await response.json()
      if (data && editType === 'Edit') {
        popuplateEditTemplate(data.data[0])
        toast.success("Item found, please edit as needed.")
      } else {
        let userResponse = window.confirm(`${data.data.length} instance found with the item name "${itemSearchRef.current.value}". Delete this item completely?`)
        if (userResponse) {
          deleteItem() // 
        }
      }
      setShowPopup('None')
    } else {
      toast.warn("No item with that name found. (Or other error)")
    }
  }

  function clearFields(){
    categoryRef.current.value = ''
    itemNameRef.current.value = ''
    stockCountRef.current.value = 0
    shDescRef.current.value = ''
    lnDescRef.current.value = ''
    dimensionsRef.current.value = ''
    stdaPriceRef.current.value = ''
    setPricelist([])
    setUploadedImages([''])
  }

  useEffect(() => {
    if (editType === "Edit"){
      setShowPopup('Edit')
    } else if (editType === "Remove") {
      setShowPopup('Remove')
    } else {
      // User is adding
      setShowPopup("None")
    }

    clearFields()
  }, [editType])
  

  return (
    <div className="admin">
      <h1>Admin Page</h1>
        
        <Popup open={showPopup !== 'None'} onClose={() => setShowPopup("None")}>
          <div className='edit-modal'>
            <h4>Please enter the exact item name you wish to {showPopup}</h4>
            <p><small>(Search criteria is case-sensitive)</small></p>
            <input type='text' ref={itemSearchRef}></input>
            <div>
              <button className='btn btn-lg btn-primary m-3' onClick={onSearchItem}>Submit</button>
            </div>
            <div>
              <button className='btn btn-sm btn-danger m-1' onClick={() => setShowPopup('None')}>Cancel</button>
            </div>
          </div>
        </Popup>

        <button className={`m-3 btn btn-lg ${editType === "Add" ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setEditType('Add')}>Add Item</button>
        <button className={`m-3 btn btn-lg ${editType === "Edit" ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setEditType('Edit')}>Edit Item</button>
        <button className={`m-3 btn btn-lg ${editType === "Remove" ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setEditType('Remove')}>Remove Item</button>
        <hr/>
        <h3>{editType} an item</h3>

        <h5>Category</h5>
        <small>
          The description of the main category (Eg. Plant Propagation, Growing Mediums and Soil)<br/>
          Try to keep it short (4 or less words). Capitalize every word that isn't "and" / "of" / "or" etc.<br/>
          If the category already exists in your shop, make sure to spell it the exact same way or you might end up <br/>
          with multiple categories that mean the same.
        </small>
        <input type="text" maxLength={25} ref={categoryRef}/>

        <h5>Item Name</h5>
        <small>The name you want displayed for the item (This MUST be unique to your item list)</small>
        <input type="text" ref={itemNameRef}/>

        <h5>Stock Count</h5>
        <small>Add your stock count for this item. Currently, this is not required.</small>
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
              <input type="text" placeholder={item.Description} onChange={(e) => handlePriceListField(e, i, 'Description')}/>
              <input type="number" placeholder={item.Cost} onChange={(e) => handlePriceListField(e, i, 'Cost')}/>
              <button className='btn btn-sm btn-danger' onClick={() => handleDeletePrice(i)}>Delete Item {i + 1}</button>
              <hr/>
            </div>

          ))}
          <button className='btn btn-sm btn-light mt-2' onClick={handleAddPrice}>Add list item</button>
        </div>

        <h5>Upload An Image</h5>
        <small>Try limit file size to below 1mb. Anything more than that will crash and not upload the image on second attempt.<br/>Keep aspect ratio in mind. Tall photos will display tall and throw off the proportions.</small>

        {uploadedImages[uploadedImages.length - 1] === '' &&
          <div className='file'>
            <input type="file" name={`my image ${uploadedImages.length - 1}`} onChange={(e) => handleImageUpload(e, uploadedImages.length - 1)}/>
          </div>
        }

        {uploadedImages.length > 0 && uploadedImages.map((image, i) => (
          image !== '' ? 
          <div key={i}>
            <img src={`data:image/png;base64,${image}`} className="uploaded-img"/>
          </div>
          :
          ''
        ))
        } 
        {editType !== "Remove" &&
          <div className='mt-5'>
            <button className='btn btn-lg btn-primary' onClick={handlePostToMongo}>
              {editType === "Add" ? "Add item" : editType === 'Edit' && "Submit Edit" }
            </button>
          </div>
        }


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
