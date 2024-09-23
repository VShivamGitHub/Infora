const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require('express-session');
const listingsRouterInfora = require("./routes/main.js");
const listingsRouterBooks = require("./routes/books/listings.js");
const listingsRouterArticles = require("./routes/articles/listings.js");
const listingsRouterNews = require("./routes/news/listings.js");


app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'AHDFSskjldfljskdf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));


app.use("/" , listingsRouterInfora);
app.use("/books", listingsRouterBooks);
app.use("/articles", listingsRouterArticles);


app.listen(8080,(req,res) => {
    console.log("App is listening to port 8080!");
});