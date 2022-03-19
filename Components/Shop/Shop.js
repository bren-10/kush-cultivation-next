import ItemCard from "./ItemCard/ItemCard";
import { useEffect, useState } from "react";
import ReadMoreModal from "../Modals/ReadMoreModal/ReadMoreModal";
import Image from 'next/image'
import toast from 'react-toastify';

function Shop(props) {
  const [data, setData] = useState({
    isLoading: true,
    shop: '',
  });
  const [openReadModal, setOpenReadModal] = useState({
    _: false,
    item: '',
    data: ''
  })

  function onReadMore (currentItem, itemInformation, dimensions){
    setOpenReadModal({
      _: true,
      item: currentItem,
      longDesc: itemInformation,
      dimensions: dimensions
    })
  }

  function onCloseReadMore () {
    setOpenReadModal({
      _: false,
      item: '',
      data: ''
    })
  }

  // Source: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function compare( a, b ) {
    if ( a.category < b.category ){
      return -1;
    }
    if ( a.category > b.category ){
      return 1;
    }
    return 0;
  }

  function organiseByCategory(data) {
    let obj = {}

    data.forEach(item => {
      if (!(Object.keys(obj).includes(item.category))) {
        obj[item.category] = []
        obj[item.category].push(item)
      } else {
        obj[item.category].push(item)
      }
    })

    // Sort a-z
    Object.keys(obj).sort()
    return obj
  }

  async function fetchCatalogue() {
    const response = await fetch('/api/shop-keeper')
    if (response.ok){
      const data = await response.json()
      let sortedData = organiseByCategory(data.data)
      setData({
        isLoading: false,
        shop: sortedData,
      });
    } else {
      toast.error('There was a problem fetching the catalogue.')
      setData({
        isLoading: false,
        shop: '',
      });
    }
  }

  useEffect(() => {
    fetchCatalogue()
  }, []);

  return (
    <div className="shop">
      <ReadMoreModal 
        open={openReadModal._} 
        longDesc={openReadModal.data} 
        item={openReadModal.item}
        onCloseReadMore={onCloseReadMore}
      />
      <h1>Shop {props.category}</h1>
      <hr></hr>
      {data.isLoading ? (
        <div className='text-center'>
          <img className='loadingator' src='/loading.gif' alt='Loading'></img>
        </div>
      ) : (
        <div>
          {data.shop ? 
            props.category !== 'All' ? 
              Object.keys(data.shop).filter(category => (category === props.category)).map((filteredItem, i) => (
                data.shop[filteredItem].map((item, i) => (
                  <div key={i}>
                    <ItemCard
                      completeItem={item}
                      onReadMore={onReadMore}
                      changeCartCount={props.changeCartCount}
                    />
                  </div>
                ))
              ))
              :
              data.shop && Object.keys(data.shop).map((category, i) => (
                <div key={i}>
                  <h3>{category}</h3>
                  {Object.keys(data.shop[category]).map((item, i) => (
                    <div key={item}>
                      <ItemCard
                        completeItem={data['shop'][category][item]}
                        onReadMore={onReadMore}
                        changeCartCount={props.changeCartCount}
                      />
                    </div>
                  ))}
                </div>
              ))
            :
            "No data found."
          }
        </div>
      )}
    </div>
  );
}

export default Shop;
