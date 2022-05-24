import Mongoose from "mongoose";
import { ClientModel } from "../../mongoose/models";
import bcrypt from 'bcrypt'


async function hashPassword(pw) {
  const saltRounds = 10

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(pw, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}

export default async function handler(req, res) {
  const clData = req.body

  const hashedPw = await hashPassword(clData.password)
  clData.password = hashedPw

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
