import React from 'react'
import { HiChevronDoubleRight } from 'react-icons/hi';

function SplashPage(props) {

  return (
    <div className="splash-container">
      <img className="kush-splash" src='/kush-full.png' alt="kush logo not found :("></img>
      <button className="btn btn-lg btn-light lezgo" onClick={props.letsGo}>Let's Go</button>
      <HiChevronDoubleRight className='double-arrow' />
    </div>
  )
}

export default SplashPage
