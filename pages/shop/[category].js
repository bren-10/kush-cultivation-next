import { useRouter } from "next/dist/client/router"
import Shop from '../../Components/Shop/Shop'

export default function category() {
  const router = useRouter()
  const { category } = router.query
  return (
    <div>
      <Shop category={category}/>
    </div>
  )
}
