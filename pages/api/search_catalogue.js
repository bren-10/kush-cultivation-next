// Bear in mind you can use this in the future for clients to search for items as well.
// Will need search refining probably using regex though. *vomits*

import { withIronSessionApiRoute } from 'iron-session/next'
import Mongoose from 'mongoose'
import { ItemModel } from '../../mongoose/models';

export default withIronSessionApiRoute(
  async function handler(req, res) {
    let searchString = req.body
    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    try {
      const itemList = await ItemModel.find({itemName: searchString})
      if (itemList.length > 0){
        res.status(200).send({"data": itemList})
      } else {
        res.status(400).send({"error": "No item with that name found."})
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

