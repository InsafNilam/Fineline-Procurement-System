const express = require("express");
const router = express.Router();

const {
  createItem,
  getItemById,
  deleteItemById,
} = require("../Controllers/purchaseController");

router.post("/addItem", createItem);
router.delete("/deleteItem/:id", deleteItemById);
router.get("/getItem/:id", getItemById);

module.exports = router;
