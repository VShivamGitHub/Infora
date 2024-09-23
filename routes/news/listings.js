const express = require("express");
const router = express.Router();
const listingController = require("../../controllers/news/listings.js");

// leads to the main page of articles
// router.get('/' , listingController.index);

// fetches all the articles
// router.get('/search', listingController.fetchAllData);

module.exports = router;