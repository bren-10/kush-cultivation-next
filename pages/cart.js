import Cart from '../Components/Shop/Cart/Cart'

export default function cart(props) {
  return (
    <div>
      <Cart changeCartCount={props.changeCartCount}/>      
    </div>
  )
}
