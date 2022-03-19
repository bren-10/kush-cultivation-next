import React, { useState } from 'react'

function ReadMoreModal(props) {

  return (
    <div onClick={props.onCloseReadMore} className='read-more-modal' style={{display: !props.open &&  'none'}}>
      <div className='modal-window'>
        <h2>{props.item}</h2>
        <br></br>
        <p>{props.longDesc}</p>
        <p>{props.dimensions}</p>
        <button onClick={props.onCloseReadMore} className='btn btn-light'>Close</button>
      </div>
    </div>
  )
}

export default ReadMoreModal
