import ItemCard from "./ItemCard/ItemCard";
import { useEffect, useState } from "react";
import ReadMoreModal from "../Modals/ReadMoreModal/ReadMoreModal";

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
    fetch("https://api.npoint.io/006d5eec44ccb6652b05") // remember to move this to .env file
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
      <h1>{props.category}</h1>
      <hr></hr>
      {data.isLoading ? (
        <div className='text-center'>
          <img className='loadingator' src='/assets/loading.gif' alt='Loading'></img>
        </div>
      ) : (
        <div>
          {data['shop'] ? 
            Object.keys(data['shop'][props.category]).map((item, i) => (
              <div key={i}>
                <ItemCard
                  completeItem={data['shop'][props.category][item]}
                  onReadMore={onReadMore}
                  changeCartCount={props.cartCount}
                />
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
