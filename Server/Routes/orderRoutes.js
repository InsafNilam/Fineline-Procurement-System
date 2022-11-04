const express = require("express");
const router = express.Router();
const Order = require("../Models/orderModule");

const {
  createOrder,
  deleteOrderById,
  getOrderById,
} = require("../Controllers/orderController");

router.post("/addOrder", createOrder);
router.get("/getOrder/:id", getOrderById);
router.delete("/deleteOrder/:id", deleteOrderById);

router.put("/updatePaidOrder/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send(`No Record with given id : $(req.params.id)`);

  Order.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (!err) res.send(doc);
      else
        console.log(
          "Error in Updating Order Details :" +
            JSON.stringify(err, undefined, 2)
        );
    }
  );
});

module.exports = router;
