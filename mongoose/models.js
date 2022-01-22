import Mongoose from "mongoose";

const ClientSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  }
})

const ClientModel = Mongoose.models.Client || Mongoose.model("Client", ClientSchema)

export default ClientModel