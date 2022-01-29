

export default function Admin() {
  return (
    <div>
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
        <small>Desc here</small>
        <input type="text" />

        <h5>Category</h5>
        <small>Desc here</small>
        <input type="text" />

        {/* ================================================================== */}

        <h3>Edit item</h3>

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
        <input type="text" />

    </div>
  )
}
