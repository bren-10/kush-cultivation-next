import Shop from '../../Components/Shop/Shop'

export default function shopAll(props) {
  const category = 'All'
  return (
    <div>
      <Shop category={category} changeCartCount={props.changeCartCount}/>
    </div>
  )
}
