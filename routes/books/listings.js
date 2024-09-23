const express = require("express");
const router = express.Router();
const listingController = require("../../controllers/books/listings.js");

// leads to home
// router.get('/', listingController.index);

// fetching data from api
router.get('/store' , listingController.fetchAllBookData);

// fetch data of a single book
router.post('/store/:bookName/:id', listingController.fetchSingleBookData);

// handling the functionalities of add to cart and buy now button in bookinfo page
router.post('/handleItems', listingController.handlingAddToCartAndBuyNowButtons);

// handling the quantity change , checkbox and delete button on cart page
router.post("/change", listingController.handlesQuantityCheckBoxAndDeleteButton);

// directing to checkOut Page
router.post("/checkOut", listingController.directingToChekOutPage);

// checking whether cart is full or empty 
router.get("/carts", listingController.cartIsEmptyOrFull);

// redirecting to cart.ejs when clicked on cart icon
router.get("/getInfoCart/:bookName", listingController.redirectToCartPage);


module.exports=router;