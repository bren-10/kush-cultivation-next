import Mongoose from "mongoose";
import { ItemModel } from "../../../mongoose/models";

export default async function handler(req, res) {
  const itemData = req.body;
  const editType = req.query.editType;

  if (editType === "addItem") {
    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const item = await ItemModel.create(itemData);
      res.status(200).json({ data: item });
    } catch (err) {
      res.status(400).json({ error: "Something went wrong." });
    }
  } else if (editType === "editItem") {
    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const response = await ItemModel.updateOne({itemName: itemData.itemName}, itemData);
      res.status(200).json({ data: response });
    } catch (err) {
      res.status(400).json({ error: "Something went wrong." });
    }
  } else {
    // User is deleting an item, we're deleting all instances (not that there should be more than one given our model restrictions)
    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const response = await ItemModel.remove({itemName: itemData});
      res.status(200).json({ data: response });
    } catch (err) {
      res.status(400).json({ error: "Something went wrong." });
    }
  }
}
