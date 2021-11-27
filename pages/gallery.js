import Gallery from '../Components/Gallery/Gallery'

export default function gallery(props) {

  let imageList = [
    "image00001.jpeg",
    "image00006.jpeg",
    "image00007.jpeg",
    "image00008.jpeg",
  ]

  return (
    <div>
      <Gallery images={imageList}/>
    </div>
  )
}

// export async function getServerSideProps(context){
//   const fs = require('fs')
//   const images = fs.readdirSync('./public/gallery')
  
//   return {
//     props: {
//       images: images
//     }
//   }
// }