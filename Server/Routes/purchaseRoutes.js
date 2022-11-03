const express = require("express");
const router = express.Router();
const { isValidObjectId } = require("mongoose");

const Item = require("../Models/itemModel");

const {
  createItem,
  getItemById,
  deleteItemById,
} = require("../Controllers/purchaseController");

router.post("/addItem", createItem);
router.delete("/deleteItem/:id", deleteItemById);
router.get("/getItem/:id", getItemById);

router.put("/updateItem/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send(`No Record with given id : $(req.params.id)`);

  Item.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (!err) res.send(doc);
      else
        console.log(
          "Error in Updating Item Details :" + JSON.stringify(err, undefined, 2)
        );
    }
  );
});

module.exports = router;
