import emailjs from '@emailjs/browser';

export default async function handler(req, res) {
  const formData = req.body
  
  emailjs.sendForm('service_zljq91s', 'template_7x6ryx5', formData, process.env.EMAILJS_USER_ID)
  .then((result) => {
    console.log(result.text);
  }, (error) => {
    console.log(error)
    res.status(400).json({"error": "Something went wrong."})
  });
}
