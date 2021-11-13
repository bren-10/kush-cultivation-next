import Gallery from '../Components/Gallery/Gallery'

export default function gallery(props) {
  return (
    <div>
      <Gallery images={props.images}/>
    </div>
  )
}

export async function getServerSideProps(context){
  const fs = require('fs')
  const images = fs.readdirSync('./public/gallery')
  
  return {
    props: {
      images: images
    }
  }
}