const moodTopics = require("../public/books/js/data");
const moodArticles = require("../public/articles/js/data");
// ./public/books/js/data
// fetches all articles data
module.exports.fetchAllData = async(req,res) => {
    let apiKEY = 'pub_541447cae16406586da952e4fdeae5e778b9e';
    let newsAPI = [
                   `https://newsdata.io/api/1/latest?apikey=${apiKEY}&country=in&prioritydomain=top`,
                   `https://newsdata.io/api/1/latest?apikey=${apiKEY}&country=us&prioritydomain=top`,
                   `https://newsdata.io/api/1/latest?apikey=${apiKEY}&country=au&prioritydomain=top`,
                   `https://newsdata.io/api/1/latest?apikey=${apiKEY}&country=bd&prioritydomain=top`,
    ];
    let index = Math.floor(Math.random()*(12));
    console.log(newsAPI[index]);
    try {
        let currentsAPI = await fetch(newsAPI[index]);
        let data = await currentsAPI.json();
        res.render('main',{data , moodTopics , moodArticles });
    } catch (error) {
        res.send("Failed to Fetch The data from the API...");
    }
};


// sample data 

