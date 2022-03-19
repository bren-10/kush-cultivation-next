import Carousel from "./Carousel/Carousel";
import Visit from "./Visit/Visit";
import ContactUs from "./ContactUs/ContactUs";

function MainLayout() {

  return (
      <div className="main-layout">
        <Carousel></Carousel>
        <Visit></Visit>
      </div>
  );
}

export default MainLayout;
