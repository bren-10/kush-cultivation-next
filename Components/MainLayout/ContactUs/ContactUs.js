import React, { useState } from 'react';
import emailjs from 'emailjs-com';
// import { useAlert } from 'react-alert';

function ContactUs() {
  // const alert = useAlert()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')

  function handlesSubmit(e) {
    e.preventDefault()

    emailjs.sendForm('service_zljq91s', 'template_7x6ryx5', e.target, 'user_uOBFW9NrPRSxzOUxEq3V7')
      .then((result) => {
          alert.success('Your query was submitted successfully.')
      }, (error) => {
          alert.error('There was a problem sending your query, please try again.')
      });
    
    setName('')
    setEmail('')
    setQuery('')
  }

  return (
    <div className='contact-us'>
      <h2>Have a question?</h2>
      <form onSubmit={handlesSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input name='from_name' value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Your Name"/>
        </div>
        <div className="form-group">
          <label>Your Email</label>
          <input name='from_email' value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="form-control" id="email" placeholder="Your Email"/>
        </div>
        <div className='form-group'>
          <label>Your Query</label>
          <textarea name='message' value={query} onChange={(e) => setQuery(e.target.value)} required cols='50' rows='5' className='form-control'></textarea>
        </div>
        <button type="submit" className="btn btn-light">Submit</button>
      </form>
    </div>
  )
}

export default ContactUs
