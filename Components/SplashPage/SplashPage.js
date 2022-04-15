import React from 'react'
import { HiChevronDoubleRight } from 'react-icons/hi';
import Image from 'next/image'

function SplashPage(props) {

  return (
    <div className="splash-container">
      <img className="kush-splash" src='/kush-full.png' alt="kush logo not found :("></img>
      <button className="btn btn-lg btn-light lezgo" onClick={props.letsGo}>Let's Go</button>
      <HiChevronDoubleRight className='double-arrow' />
      <div className='cookie-acceptance'>
        <p>By clicking "Let's Go" or refreshing this page, you accept that this website makes use of Cookies.</p>
      </div>
    </div>
  )
}

export default SplashPage
