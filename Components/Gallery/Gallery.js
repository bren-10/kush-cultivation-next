import GalleryImage from "./GalleryImage/GalleryImage";

function Gallery() {
  // function importAll(r) {
  //   return r.keys().map(r);
  // }

  // const images = importAll(
  //   require.context("./media", false, /\.(png|jpe?g|svg)$/)
  // );

  return (
    <div className="gallery">
      <h1>Kush Gallery</h1>
      <hr></hr>
      <div className="row">
        {/* {images.map((image, i) => (
          <GalleryImage
            key={i}
            imageSmall={image.default}
            imageLarge={image.default}
            imageTitle={image.default}
            imageCount={images.length}
          ></GalleryImage>
        ))} */}
      </div>
    </div>
  );
}

export default Gallery;
