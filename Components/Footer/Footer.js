import { GrMail } from "react-icons/gr";

function Footer() {

  const dynamicYear = new Date().getFullYear()

  return (
    <div className='footer'>
      <h6>
        Website created by
        <a className='mr-2' href="http://www.bren-10.co.za" target='_blank'> <span>Bren-10</span></a>
        <a href="mailto:info@bren-10.co.za">
          <GrMail className="mail" style={{marginBottom: '3px'}}/>
        </a>
      </h6>
      {/* <hr></hr> */}
      <p>&copy; {dynamicYear} Brendan Stander & Kush Cultivation, All Rights Reserved.</p>
    </div>
  )
}

export default Footer
