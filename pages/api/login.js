import { withIronSessionApiRoute } from 'iron-session/next'
import Mongoose from 'mongoose'
import ClientModel from '../../mongoose/models';
import bcrypt from 'bcrypt'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const clData = req.body

    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    try {
      const existingClient = await ClientModel.find({email: clData.email})
      bcrypt.compare(clData.password, existingClient[0].password, async function(err, result) {
        if (result) {
          req.session.user = existingClient;
          await req.session.save();
          res.status(200).json({"data": existingClient})
        } else {
          res.status(400).json({"data": "Passwords do not match."}) // TODO perhaps status code 201? BC user does exist
        }
      })
    } catch (err) {
      res.status(400).json({"Error": err})
    }

    
  },
  {
    cookieName: "kush_cookie",
    password: process.env.COOKIE_PW,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: !process.env.IN_PRODUCTION,
    },
  },
);