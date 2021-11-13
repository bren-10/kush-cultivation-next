import { useState } from "react";
import ModalImage from "react-modal-image";

function GalleryImage(props) {
  const title = props.imageTitle;

  const [loading, setLoading] = useState(true);

  function imageLoaded() {
    setLoading(false);
  }

  return (
    <div className="gallery-image col-lg-3">
      {/* <img
        className="triangles"
        src={loadingCircle}
        style={{ display: loading ? "block" : "none"}}
        alt="triangles are missing!"
      ></img> */}
      <p className="triangles" style={{ display: loading ? "block" : "none"}}>LOADING</p>
      <span
        onLoad={imageLoaded}
        style={{ display: loading ? "none" : "block"}}
      >
        <ModalImage
          className="test-hover"
          small={`/gallery/${props.imageSmall}`}
          large={`/gallery/${props.imageLarge}`}
          alt={title}
        />
      </span>
    </div>
  );
}

export default GalleryImage;
