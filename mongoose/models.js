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


const ItemSchema = new Mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: true
  },
  itemName: {
    type: String,
    trim: true
  },
  stockCount: {
    type: Number,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  longDescription: {
    type: String,
    trim: true
  },
  dimensions: {
    type: String,
    trim: true
  },
  priceStandalone: {
    type: Number,
    trim: true
  },
  priceMulti: {
    type: Array
  },
  images: {
    type: Array
  }
})

const ItemModel = Mongoose.models.Item || Mongoose.model("Item", ItemSchema)

export { ClientModel, ItemModel }