import emailjs from 'emailjs-com'

export default async function handler(req, res) {
  const formData = req.body
  emailjs.sendForm('service_zljq91s', 'template_7x6ryx5', formData, 'user_uOBFW9NrPRSxzOUxEq3V7')
  .then((result) => {
    console.log(result.text);
  }, (error) => {
    res.status(400).json({"error": "Something went wrong."})
  });
}
