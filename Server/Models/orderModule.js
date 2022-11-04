const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  siteName: {
    type: String,
    required: [true, "Site Name is required"],
  },
  supplierName: {
    type: String,
    required: [true, "Supplier Name is required"],
  },
  items: {
    type: Array,
    required: [true, "Item is required"],
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
    required: [true, "Delivery Date is required"],
  },
  total: {
    type: Number,
    default: 0,
  },
  userID: {
    type: String,
    required: [true, "User ID is required"],
  },
  staffID: {
    type: String,
    default: "",
  },
  paidStatus: {
    type: String,
    default: "Pending",
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
