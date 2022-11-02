const express = require("express");
const router = express.Router();

const {
  createOrder,
  deleteOrderById,
  getOrderById,
} = require("../Controllers/orderController");

router.post("/addOrder", createOrder);
router.get("/getOrder", getOrderById);
router.delete("/deleteOrder/:id", deleteOrderById);

module.exports = router;
