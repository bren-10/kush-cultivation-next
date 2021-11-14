import { useState, useEffect } from 'react'
import { FaShoppingCart, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import Link from 'next/link'
// import AuthContext from '../../Storage/auth-context';
// import { useAlert } from 'react-alert';

function KushNavbar(props) {
  // const alert = useAlert()
  const history = useHistory()
  const [data, setData] = useState({
    isLoading: true,
    shop: ''
  });

  // const authCtx = useContext(AuthContext)
  // const isLoggedIn = authCtx.isLoggedIn

  function handleLogout(){
    authCtx.logout()
    history.replace('/')
    alert.success('Logged out successfully')
  }

  useEffect(() => {
    if (data.isLoading) {
      fetch("https://api.npoint.io/006d5eec44ccb6652b05") // remember to move this to .env file
        .then((response) => response.json())
        .then((result) => {
          setData({
            isLoading: false,
            shop: result
          });
        })
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link href="/" className="navbar-brand" ><img alt='logo missing :(' src="/kush-logo.png"></img></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="https://google.comnavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" href="https://google.com" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {Object.keys(data.shop).map((key) => (

                  <Link href={`/shop/${key}`} key={key}><a className="dropdown-item">{key}</a></Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <Link href='/gallery'><a className="nav-link">Gallery</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/contact"><a className="nav-link">Contact Us</a></Link>
            </li>
            <li className="nav-item cart">
              <Link href='/cart'><a className="nav-link"><FaShoppingCart/> {props.cartCount}</a></Link>
            </li>
            {/* {!isLoggedIn && 
              <li className="nav-item">
                <Link className="nav-link" to='/user-authentication'>Login</Link>
              </li>
            } */}
            {/* {!isLoggedIn && 
              <li className="nav-item">
                <Link className="nav-link" to='/user-authentication'>Register</Link>
              </li>
            } */}
            {/* {isLoggedIn && 
              <li className="nav-item">
                <span className="nav-link" onClick={handleLogout}>Logout</span>
              </li>
            } */}
            {/* {isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to='/user-authentication'>Profile</Link>
              </li>
            } */}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://instagram.com/kush_cultivation_cpt?igshid=11ni3d91leo8y/" target="_blank" rel="noreferrer"><AiFillInstagram/></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.facebook.com/KushCultivationCPT/" target="_blank" rel="noreferrer"><FaFacebook/></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.youtube.com/channel/UCed5h6zpO8uezWAynPDtqXw" target="_blank" rel="noreferrer"><AiFillYoutube/></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://wa.me/27721871099?text=Hi!%20I%20Have%20a%20query..." target="_blank" rel="noreferrer"><RiWhatsappFill/></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default KushNavbar
