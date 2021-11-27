import ItemCard from "./ItemCard/ItemCard";
import { useEffect, useState } from "react";
import ReadMoreModal from "../Modals/ReadMoreModal/ReadMoreModal";
import Image from 'next/image'

function Shop(props) {
  const [data, setData] = useState({
    isLoading: true,
    shop: {},
  });
  const [openReadModal, setOpenReadModal] = useState({
    _: false,
    item: '',
    data: ''
  })

  function onReadMore (currentItem, itemInformation){
    setOpenReadModal({
      _: true,
      item: currentItem,
      data: itemInformation
    })
  }

  function onCloseReadMore () {
    setOpenReadModal({
      _: false,
      item: '',
      data: ''
    })
  }

  useEffect(() => {
    fetch("/api/shop-keeper")
      .then((response) => response.json())
      .then((result) => {
        setData({
          isLoading: false,
          shop: result,
        });
      })
      .catch ((e) => {
        console.log(`%c ${e}`, 'background: red; color: white;')
      })
  }, []);

  return (
    <div className="shop">
      <ReadMoreModal 
        open={openReadModal._} 
        data={openReadModal.data} 
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
          {data['shop'] ? 
            props.category !== 'All' ? 
              Object.keys(data['shop'][props.category]).map((item, i) => (
                <div key={i}>
                  <ItemCard
                    completeItem={data['shop'][props.category][item]}
                    onReadMore={onReadMore}
                    changeCartCount={props.changeCartCount}
                  />
                </div>
              ))
              :
              Object.keys(data['shop']).map((category, i) => (
                <div key={i}>
                  <h3>{category}</h3>
                  {Object.keys(data['shop'][category]).map((item, i) => (
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
