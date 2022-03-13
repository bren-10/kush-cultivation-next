import emailjs from '@emailjs/browser'

export default async function handler(req, res) {
  const formData = req.body
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
  .then((result) => {
    console.log(result.text);
  }, (error) => {
    res.status(400).json({"error": "Something went wrong."})
  });
}
