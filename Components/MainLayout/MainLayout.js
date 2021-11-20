import Carousel from "./Carousel/Carousel";
import Visit from "./Visit/Visit";
import LoginRegister from "../Authentication/LoginRegister/LoginRegister";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import ContactUs from "./ContactUs/ContactUs";

function MainLayout() {

  return (
      <div className="main-layout">
        <Carousel></Carousel>
        <Visit></Visit>
        <ContactUs></ContactUs>
      </div>
  );
}

export default MainLayout;
