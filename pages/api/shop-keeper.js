import { withIronSessionApiRoute } from 'iron-session/next'
import Mongoose from 'mongoose'
import { ItemModel } from '../../mongoose/models';
import bcrypt from 'bcrypt'

export default withIronSessionApiRoute(
  async function handler(req, res) {

    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    try {
      const itemList = await ItemModel.find()
      if (itemList.length > 1){
        res.status(200).send({"data": itemList})
      }
    } catch (err) {
      res.status(400).send({"data": "The credentials you provided are incorrect."})
    }

    
  },
  {
    cookieName: "kush_cookie",
    password: process.env.COOKIE_PW,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: !process.env.NEXT_PUBLIC_IN_PRODUCTION,
    },
  },
);