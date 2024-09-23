const moodTopics = require('../../public/articles/js/data.js');

// controllers/articles/listings.js
// module.exports.index = (req, res) => {
//     res.render('articles/listings/home',{moodTopics});
// };

// fetches all articles data
module.exports.fetchAllData = async(req,res) => {
  try {
    let {topics , ArticleValue} = req.query;
    if( !req.session.articles ){
      req.session.articles = [];
    }
    let data = null;
    let article = req.session.articles.find( topic => topic === topics );
    if(!article){
      let newsAPI = 'https://newsapi.org/v2/everything?q='+ topics +'&apiKey=d95cbe5888414c0c81ddbc72a4efde39';
      // Fetch data from the API
      let currentsAPI;
      try {
        currentsAPI = await fetch(newsAPI);
      } catch (networkError) {
        // Network error (e.g., no internet)
        return res.send("Unable to fetch data. Please check your internet connection.");
      }
      
      // Check if the API response is not successful (e.g., invalid API key, server issues)
      if (!currentsAPI.ok) {
        return res.render('articles/listings/error', { 
          message: "Failed to fetch data from the API. Please try again later.", 
          moodTopics 
        });
      }
      data = await currentsAPI.json();
      const articleData = {
        topic : topics,
        data : data
      };
      req.session.articles.push(articleData);
    }
    else{
      data = article.data;
    }
    res.render('articles/listings/article',{data , moodTopics , ArticleValue , topics});
  } catch (error) {
    return res.send("Failed to Fetch The data from the API...");
  }
};