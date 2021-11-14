import emailjs from 'emailjs-com';
import { useState } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function ContactUs() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')

  function handlesSubmit(e) {
    e.preventDefault()

    emailjs.sendForm('service_zljq91s', 'template_7x6ryx5', e.target, 'user_uOBFW9NrPRSxzOUxEq3V7')
      .then((result) => {
        NotificationManager.success('Successfully sent your query.')
      }, (error) => {
        NotificationManager.error('Successfully sent your query.')
      });
    
    setName('')
    setEmail('')
    setQuery('')
  }

  return (
    <div className='contact-us'>
      <NotificationContainer/>
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