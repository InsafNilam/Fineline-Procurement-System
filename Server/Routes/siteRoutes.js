const express = require("express");
const router = express.Router();

const {
  createSite,
  deleteSite,
  getSite,
} = require("../Controllers/siteController");

router.post("/addSite", createSite);
router.get("/getSite", getSite);
router.delete("/deleteSite/:id", deleteSite);

module.exports = router;
