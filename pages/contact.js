import emailjs from 'emailjs-com';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { GrMail } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";
import { RiWhatsappFill } from 'react-icons/ri'

export default function ContactUs() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  function handlesSubmit(e) {
    setLoading(true)
    e.preventDefault()

    emailjs.sendForm('service_zljq91s', 'template_7x6ryx5', e.target, 'user_uOBFW9NrPRSxzOUxEq3V7')
      .then((result) => {
        toast.success('Successfully sent your query.')
      }, (error) => {
        toast.error('There was a problem sending your query.')
      });

    setName('')
    setEmail('')
    setQuery('')
    setLoading(false)
  }

  return (
    <div style={{marginTop: '8rem'}}>
      
      {/* <form onSubmit={handlesSubmit}>
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
        <button type="submit" className="btn btn-light" disabled={loading}>{loading ? "Please wait" : "Submit"}</button>
      </form> */}

      <div className="text-center visit">
      <h2>Have a question?</h2>
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
    </div>
  )
}