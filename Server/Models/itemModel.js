const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Item Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  orderId: {
    type: String,
  },
});

const Item = mongoose.model("items", itemSchema);
module.exports = Item;
