const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  name: {
    type: String,
    required: [true, "Site Name is required"],
  },
  description: {
    type: String,
    required: [true, "Site Description is required"],
  },
  address: {
    type: String,
    required: [true, "Site Address is required"],
  },
});

const Site = mongoose.model("sites", siteSchema);
module.exports = Site;
