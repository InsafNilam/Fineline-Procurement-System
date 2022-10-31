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
  role: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("user", userSchema);

module.exports = Customer;
