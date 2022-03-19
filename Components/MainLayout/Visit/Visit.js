import { RiPlantFill, RiWhatsappFill } from "react-icons/ri";
import { GrMail } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";

function Visit() {
  return (
    <div className="visit text-center">
      <h2>Want to visit us in-store?</h2>
      <RiPlantFill className="plant"></RiPlantFill>
      <div className="row">
        <div className="col-lg text-center">
          <h4>Contact US</h4>
          <hr></hr>
          <h6>Email</h6>
          <a href="mailto:kushcultivation@gmail.com">
            <GrMail className="comm-icon" />
          </a>
          <h6>Whatsapp</h6>
          <a
            href="https://wa.me/27721871099?text=Hi!%20I%20Have%20a%20query..."
            target="_blank"
            rel="noreferrer"
          >
            <RiWhatsappFill className="comm-icon" />
          </a>
          <h6>Call</h6>
          <a href="tel:+27721871099">
            <FaPhoneAlt className="comm-icon" />
          </a>
        </div>
        <div className="col-lg text-center">
          <h4>In-shop trading hours:</h4>
          <hr></hr>
          <p>
            <b>Monday to Friday:</b>
            <br></br>09:00 - 18:00
          </p>
          <p>
            <b>Saturdays:</b>
            <br></br>10:00 - 14:00
          </p>
          <p>
            <b>Sundays:</b>
            <br></br>Closed
          </p>
          <p>
            <b>Public Holidays:</b>
            <br></br>Please check in advance
          </p>
        </div>
      </div>
    </div>
  );
}

export default Visit;
