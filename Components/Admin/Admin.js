import { useState, useReducer } from 'react'
import toast from 'react-nextjs-toast';

export default function Admin() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [pricelist, setPricelist] = useState([])
  const [uploadedImage, setUploadedImage] = useState('')

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

  function handleImageUpload(e){
    console.log(e.target.files)
    let binaryData = []
    binaryData.push(e.target.files[0])
    let img = window.URL.createObjectURL(new Blob(binaryData))
    setUploadedImage(img)

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
        <input type="text" maxLength={25}/>

        <h5>Item Name</h5>
        <small>The name you want displayed for the item</small>
        <input type="text" />

        <h5>Stock</h5>
        <small>Add your stock count for this item./</small>
        <input type="number" />

        <h5>Short description</h5>
        <small>
          Example: "The Humidity Dome is perfect for Germinating or Propagating. Comes with 4 x 6 cell seedling trays."<br/>
          Around 15-20 words is fine.
        </small>
        <input type="text" />

        <h5>Long description</h5>
        <small>
          This text will show when the user clicks the "Read More" button on an item. No length limit, make it descriptive.
        </small>
        <input type="text" />

        <h5>Dimensions</h5>
        <small>
          Self-explanatory. Add in any format you want.
        </small>
        <input type="text" />

        <h5>Price (Standalone)</h5>
        <small>
          If the item is sold as a whole, i.e. no sizes etc, add a price here. Otherwise leave 0 or empty.
        </small>
        <input type="number" />

        <h5>Pricelist</h5>
        <small>
          If the item is sold in different sizes, e.g. "6 plug tray", "12 plug tray" etc, add descriptions and prices here.
        </small>
        <div className="price-list">
          {pricelist && pricelist.map((item, i) => (
            <div key={i} className='mt-3'>
              <>Item {i+1}</>
              <input type="text" placeholder={item.Description}/>
              <input type="number" placeholder={item.Cost}/>
              <button className='btn btn-sm btn-danger' onClick={() => handleDeletePrice(i)}>Delete Item {i + 1}</button>
              <hr/>
            </div>

          ))}
          <button className='btn btn-md btn-light mt-2' onClick={handleAddPrice}>Add list item</button>
        </div>

        <h5>Upload An Image</h5>
        <small>Try limit file size to below 5mb, otherwise it's going to load slowly.</small>
        <div className='file'>
          <input type="file" name="my image" onChange={handleImageUpload}/>
        </div>
        
        {uploadedImage && 
          <img src={uploadedImage}/>
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
