const express = require("express");
const router = express.Router();
const listingController = require("../controllers/main.js");

router.get('/', listingController.fetchAllData);

module.exports = router;