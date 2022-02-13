import Mongoose from "mongoose";
import { ClientModel } from "../../mongoose/models";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const clData = req.body
  const saltRounds = 10

  bcrypt.hash(clData.password, saltRounds, function(err, hash) {
    clData.password = hash
  })

  Mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    const client = await ClientModel.create(clData)
    res.status(200).json({"data": client})
  } catch (err) {
    if ("keyPattern" in err && err.keyPattern.email) {
      res.status(400).json({"error": "Email already registered."})
    } else {
      res.status(400).json({"error": "Something went wrong."})
    }
  }

}
