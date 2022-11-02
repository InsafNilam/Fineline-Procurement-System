const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Customer Name is required"],
  },
  email: {
    type: String,
    required: [true, "Customer Email is required"],
  },
  password: {
    type: String,
    required: [true, "Customer Password is required"],
  },
  phone: {
    type: Number,
    required: [true, "Customer Role is required"],
  },
  role: {
    type: String,
    required: [true, "Customer Role is required"],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("users", userSchema);

module.exports = Customer;
