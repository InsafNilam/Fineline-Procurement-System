const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  siteName: {
    type: String,
    required: [true, "Item Name is required"],
  },
  items: {
    type: Array,
    required: [true, "Description is required"],
  },
  supplierName: {
    type: Number,
    required: [true, "Supplier Name is required"],
  },
  buyerName: {
    type: String,
    required: [true, "Buyer Name is required"],
  },
  phone: {
    type: String,
    required: [true, "User Phone is required"],
  },
  deliverAddress: {
    type: String,
    required: [true, "Delivery Address is required"],
  },
  deliverDate: {
    type: String,
    required: [true, "Delivery is required"],
  },
  total: {
    type: Number,
  },
  userID: {
    type: Number,
    required: [true, "User ID is required"],
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;