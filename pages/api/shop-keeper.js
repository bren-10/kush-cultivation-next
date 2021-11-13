export default async function handler (req, res) {

  const request = await fetch("https://api.npoint.io/b2b8e81be99c3f00d17f");
  if (request.ok) {
    const data = await request.json()
    res.status(200).json(data)
  } else {
    throw new Error('Bad response from server.')
  }
}