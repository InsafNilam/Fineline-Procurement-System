const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, "Supplier Name is required"],
  },
  company: {
    type: String,
    required: [true, "Supplier Company is required"],
  },
  description: {
    type: String,
    required: [true, "Supplier Description is required"],
  },
  address: {
    type: String,
    required: [true, "Supplier Address is required"],
  },
});

const Supplier = mongoose.model("suppliers", supplierSchema);
module.exports = Supplier;
