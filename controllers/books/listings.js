const moodTopics = require('../../public/books/js/data.js');


// leads to home page of books
module.exports.index = (req,res) => {
    res.render('books/listings/home');
};

// fetching data from api
module.exports.fetchAllBookData = async(req,res) => {
    try {
        let {bookName} = req.query;
        let book = null;
        if(!req.session.bookData){
            req.session.bookData = [];
        }
        book = req.session.bookData.find(b => b.bookName === bookName);
        if (book) {
            console.log("Yes express-session is working!!");
        }
        let data = {};
        if( !book ){
            console.log("No express-session is not working!!");
            let googleAPI = "https://www.googleapis.com/books/v1/volumes?q=";
            let bookUrl = googleAPI + bookName;
            let bookList = await fetch(bookUrl);
            data = await bookList.json();
            req.session.bookData.push({
                bookName: bookName,
                data: data
            });
            // req.session.bookData.forEach(function(b) {
            //     console.log(b);
            // });
        }
        else{
            data = book.data;
        }
        if(!data){
            console.log("This is out of stock!!");
            return res.redirect('/books');
        }
        else{
            res.render('books/listings/books',{ data , bookName , moodTopics});
        }
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};

// fetch data of a single book
module.exports.fetchSingleBookData = async(req,res) => {
    try {
        let {bookName,id} = req.params;
        const {price} = req.body;
        if(req.session.bookData){
            // req.session.bookData.forEach(function(b) {
            //     console.log(b.data);
            // });
            let bookInfo = req.session.bookData.find(book => book.bookName === bookName);
            let book = bookInfo.data.items.find(b => b.id === id);
            if(!book){
                console.log("This is out of stock!!");
                return res.redirect('/books');
            }
            else{
                let n = Math.floor(Math.random()*(9)+2);
                // console.log(price);
                res.render('books/listings/bookInfo',{book,n,price,bookName, moodTopics});
            }
        }
        else {
            console.log("Session expired or no book data in session!!");
            return res.redirect('/books');
        }
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};

// handling the functionalities of add to cart and buy now button in bookinfo page
module.exports.handlingAddToCartAndBuyNowButtons = (req,res) => {
    try {
        const { productId, price, bookName , n , quantity, action } = req.body;
        // if (!productId || !price || !quantity) {
        //     return res.status(400).send('Missing product information.');
        // }
        let bookInfo = req.session.bookData.find(book => book.bookName === bookName);
        let book = bookInfo.data.items.find(b => b.id === productId);
        const productData = {
            productId: productId,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            available:n,
            totalPrice: parseFloat(price) * parseInt(quantity),
            data: book,
            checked: true
        };
        // console.log(productId);
        // console.log(price);
        // console.log(quantity);
        if (action === 'addToCart'){
            if (!req.session.cart) {
                req.session.cart = [];
            }
            if(!req.session.subTotal){
                req.session.subTotal = 0;
            }
            const existingProductIndex = req.session.cart.findIndex(item => item.productId === productId);
            // console.log(existingProductIndex);
            if( existingProductIndex != -1 ){
                req.session.cart[existingProductIndex].quantity = productData.quantity;
                req.session.cart[existingProductIndex].totalPrice = productData.totalPrice;
            }
            else{
                req.session.cart.push(productData);
            }
            let subtotal = 0;
            req.session.cart.forEach( item => {
                if(item.checked){
                    subtotal += item.totalPrice;
                }
            });
            req.session.subTotal = subtotal;
            let items = req.session.cart;
            res.render('books/listings/cart',{items , subtotal, moodTopics ,bookName });
        }
        else if(action === 'buyNow'){
            const Total = productData.totalPrice;
            const items = [];
            items.push(productData);
            res.render('books/listings/checkOut',{items,Total, moodTopics ,bookName});
        }
        else{
            res.status(400).send('Invalid action.');
        }
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};

// handling the quantity change , checkbox and delete button on cart page
module.exports.handlesQuantityCheckBoxAndDeleteButton = (req,res) => {
    try {
        const {action , itemId , newQuantity , bookName} = req.body;
        let items = req.session.cart;
        if (action === 'quantity-change') {
            // Find the item by itemId and update its quantity
            let item = items.find(item => item.data.id === itemId);
            if (item) {
                item.quantity = parseInt(newQuantity);
                item.totalPrice = item.price * item.quantity;
            }
            let subtotal = 0;
            req.session.cart.forEach( item => {
                if(item.checked){
                    subtotal += item.totalPrice;
                }
            });
            req.session.subTotal = subtotal;
            const previousUrl = req.get('referer');
            res.render('books/listings/cart',{items , subtotal, moodTopics ,bookName});
        }
        else if (action === 'delete-item') {
            // Remove the item from the cart
            req.session.cart = items.filter(item => item.data.id !== itemId);
            items = req.session.cart;
            let subtotal = 0;
            items.forEach( item => {
                if(item.checked){
                    subtotal += item.totalPrice;
                }
            });
            req.session.subTotal = subtotal;
            res.render('books/listings/cart',{items , subtotal, moodTopics ,bookName});  // Redirect back to the cart after deleting the item
        }
        else if (action === 'toggle-check') {
            // Update the checkbox status based on itemId
            let item = items.find(item => item.data.id === itemId);
            if (item) {
                item.checked = !item.checked ;  // Convert string to boolean
            }
            let subtotal = 0;
            req.session.cart.forEach( item => {
                if(item.checked){
                    subtotal += item.totalPrice;
                }
            });
            req.session.subTotal = subtotal;
            res.render('books/listings/cart',{items , subtotal , moodTopics ,bookName});  // Redirect back to the cart after deleting the item
        } else {
            res.redirect('/books/cart');  // Fallback case: redirect back to the cart
        } 
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};

// directing to checkOut Page
module.exports.directingToChekOutPage = (req,res) => {
    try {
        const { bookName} = req.body;
        if (!req.session.cart) {
            return res.send("Your cart is empty. Add items to proceed to checkout.");
        }
        const items = JSON.parse(JSON.stringify(req.session.cart));
        // const items = req.session.cart.find(item => item.checked);
        for (const key in items) {
            if (items[key].checked === false) {
              delete items[key];
            }
        }
        const Total = req.session.subTotal;
        console.log(items);
        if( items && Object.entries(items).length > 0 ){
            res.render('books/listings/checkOut',{items,Total, moodTopics ,bookName});
        }
        else{
            res.send("Your cart is empty. Add items to proceed to checkout.");
        }
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};

// checking whether cart is full or empty 
module.exports.cartIsEmptyOrFull = (req,res) => {
    try {
        if(req.session.cart && req.session.cart.length > 0){
            // console.log("cart is full")
            res.json({ isCartEmpty: false });
        }
        else{
            // console.log("cart is empty");
            res.json({ isCartEmpty: true });
        }
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};

// redirecting to cart.ejs when clicked on cart icon
module.exports.redirectToCartPage = (req,res) => {
    try {
        const {bookName} = req.params;
        console.log(bookName);
        let items = req.session.cart;
        let subtotal = 0;
        items.forEach( item => {
            if(item.checked){
                subtotal += item.totalPrice;
            }
        });
        // console.log("cart is full")
        res.render('books/listings/cart',{items , subtotal , moodTopics , bookName});
    } catch (error) {
        res.render("Failed to Fetch The data from the API...");
    }
};