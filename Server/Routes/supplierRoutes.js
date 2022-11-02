const express = require("express");
const router = express.Router();

const {
  createSupplier,
  deleteSupplier,
  getSupplier,
} = require("../Controllers/supplierController");

router.post("/addSupplier", createSupplier);
router.get("/getSupplier", getSupplier);
router.delete("/deleteSupplier/:id", deleteSupplier);

module.exports = router;
