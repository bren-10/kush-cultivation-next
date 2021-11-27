import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import Iframe from 'react-iframe'
import Link from 'next/link'
import Image from 'next/image'

function Carousel() {

  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row">
              <div className="col-lg item-left">
                <img className="d-block w-100 hydro-logo" src='/hydro-logo.png' alt="First slide"/>
              </div>
              <div className="col-lg item-right carousel-text">
                <h5>Kush Cultivation Welcomes You!</h5>
                <h6><i>South Africa's latest Grow Shop</i></h6>
                <hr></hr>
                <p>
                  We're committed to not only providing quality products and services,
                  but going above and beyond to ensure our customers are <strong>completely</strong> satisfied.
                  Here at KC, we sell only the top-rated grow room equipment brands in South Africa, at an affordable price.
                  We welcome you to look through our site and see all we have to offer.
                </p>
                <Link href='/shop'><button className='btn btn-md btn-light'>Shop Now</button></Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-lg item-left carousel-text">
                <h2>New to the game?</h2>
                <hr></hr>
                <h5>Watch this video tutorial on how to set up your grow tent as a beginner.</h5>
                <FaLongArrowAltRight className='arrow'/>
              </div>
              {/* <div id="playerTut" className='col-lg item-right vid'></div> */}
              <div className="col-lg item-right vid">
                {/* <iframe id="blah" width="560" height="300" src="https://www.youtube.com/embed/8OfwfLj2yG8" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <Iframe 
                  url="https://www.youtube.com/embed/NBkJsz2FwSI"
                  width="750px"
                  height="450px"
                  id="blah"
                  // className="col-lg item-right vid"
                  display="initial"
                  position="relative"
                />
              </div>
              
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-lg item-left">
                <img className="d-block w-100 fix-height collage" src='/collage.jpg' alt="Third slide"/>
              </div>
              <div className='col-lg item-right carousel-text'>
                <h2>Gallery</h2>
                <hr></hr>
                <h5>View some photos of our gear</h5>
                <Link href='/gallery'><button className='btn btn-md btn-light mt-2'>View Gallery</button></Link>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

export default Carousel
