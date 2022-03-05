import { useState, useEffect, Fragment, useReducer } from 'react'
import { FaShoppingCart, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router';
import { toast } from 'react-toastify';

function KushNavbar(props) {
  const router = useRouter()
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  const [data, setData] = useState({
    isLoading: true,
    shop: ''
  });
  const isUser = localStorage.getItem('kush_cultivation__thereIsUser')

  async function handleLogout(){
    const res = await fetch('/api/logout')
    if (res.ok){
      router.replace('/')
      toast.success("Logged out successfully.")
      localStorage.removeItem('kush_cultivation__thereIsUser')
    }
  }

  async function fetchShopCategories() {
    const response = await fetch('/api/shop-keeper')
    if (response.ok) {
      const resData = await response.json()

      setData({
        isLoading: false,
        shop: resData
      })
      forceUpdate()    
    }
  }

  useEffect(() => {
    if (data.isLoading) {
      fetchShopCategories()
    }
  }, []);


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link href="/" className="navbar-brand" ><img alt='logo missing :(' src="/kush-logo.png"></img></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {data.shop && data.shop.data.map((item, i) => (

                  <Link href={`/shop/${item['category']}`} key={i}><a className="dropdown-item">{item['category']}</a></Link>
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
              
              {isUser ? 
                <li className="nav-item">
                  <Link href=""><a className="nav-link" onClick={handleLogout}>Logout</a></Link>
                </li>
                :
                <>
                  <li className="nav-item">
                    <Link href="/auth/login"><a className="nav-link">Login</a></Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/auth/register"><a className="nav-link">Register</a></Link>
                  </li>
                </>
              }
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
