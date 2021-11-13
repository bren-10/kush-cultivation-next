import GalleryImage from "./GalleryImage/GalleryImage";

function Gallery(props) {
  
  return (
    <div className="gallery">
      <h1>Kush Gallery</h1>
      <hr></hr>
      <div className="row">
        {props.images.map((image, i) => (
          <GalleryImage
            key={i}
            imageSmall={image}
            imageLarge={image}
            imageTitle={image}
          ></GalleryImage>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
