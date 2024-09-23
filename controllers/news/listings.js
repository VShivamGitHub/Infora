const moodTopics = require('../../public/news/js/data.js');

// fetches all articles data
module.exports.fetchAllData = async(req,res) => {
    let {topics} = req.query;
    if( !req.session.news ){
      req.session.news = [];
    }
    let data = null;
    let news = req.session.news.find( topic => topic === topics );
    if(!news){
      let newsAPI = 'https://async.scraperapi.com/structured/google/news?api_key=9d95851ca5196b0b05a72fabce3263f1&country_code=en&tld=com&query='+topics;
      let currentsAPI = await fetch(newsAPI);
      data = await currentsAPI.json();
      const articleData = {
        topic : topics,
        data : data
      };
      req.session.news.push(articleData);
    }
    else{
      data = news.data;
    }
    res.render('news/listings/news',{data , moodTopics});
};

// sample news data looks like this....
// {
// 	"search_information": {
// 		"query_displayed": "Space",
// 		"total_results": 49900000,
// 		"time_taken_displayed": 0.58
// 	},
// 	"articles": [
// 		{
// 			"source": "CNBC",
// 			"thumbnail": "data:image/jpeg;base64,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\\x3d",
// 			"title": "Investing in Space: The latecomer",
// 			"description": "CNBC's Investing in Space newsletter offers a view into the business of \nspace exploration and privatization, delivered straight to your...",
// 			"date": "1 day ago",
// 			"link": "https://www.cnbc.com/2023/03/23/investing-in-space-the-virgin-orbit-latecomer-matthew-brown.html"
// 		},
// 		{
// 			"source": "SpaceNews",
// 			"thumbnail": "data:image/jpeg;base64,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",
// 			"title": "ABL Space gets $60 million for responsive launch demonstrations",
// 			"description": "The funding under the 'STRATFI' agreement includes $30 million from the \nU.S. Space Force and U.S. Air Force, and $30 million from private...",
// 			"date": "18 mins ago",
// 			"link": "https://spacenews.com/abl-space-gets-60-million-for-responsive-launch-demonstrations/"
// 		},
// 		{
// 			"source": "The Wall Street Journal",
// 			"thumbnail": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAC4QAAEDAwMCBQIHAQAAAAAAAAEAAgMEESEFEjFBUQYTIjJhQnEUI1JigZGhFf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAYEQEAAwEAAAAAAAAAAAAAAAAAAQIREv/aAAwDAQACEQMRAD8A8bCVl1K6BWTgEgQntAQJrVMxq4wBERsuoExl1OyL4UkUSMjgv0QBeSmuhVqKY9kyWnI6KaKd8dlCWZVnLEhXR5VEf/DqT7HMd/iik0ivZzTucO7cq4iqXj6kXHXuHKoyb6eaP3xPb9wmtuOQte+ujdiQXCCk/DyuP5LbdxhBSR8oyFuQrCHToZb7XBp7FFw6TkDcM/KgFgbwreip95Fgiafw/UFm9jdze6utI04wyt81nXqs2nA2m0N8rA5rDY/CrdR010F9zV7NoEdG2js9rAflY/xgynDpHQhtlxi0q8qqY7E4QD2epW+oe91lVv8Acu8Mg45b9UVGHO4VZG8BFxVW1aUb+Akl9r7IeahqKe5eSR3CIhrz1KJGox2sTdBVw1b4lONRe7grlY6GY3a3af29UAY33xeyC0p9dr6WT8iodb9JOF6F4O12LWWOgc50dRHZzy9vpP2K8q2uIU9BV1GnzCWkkMcg+oKYr3ipqDFE6SJ7XN4weFlNYrX1Adi3dZCbxnqEjhIIqdk4GXtabH+L2Wl8K6jp/iGmNLqEjKTUy702Fo5W9/ggdP6WeUZeuvuKqXn1FabxBp7qOpfHcGx5HBWZmaQ8qimBXfNtwoslcWhL5zj1T2yHuh04GyA2OTujYpmgYVOHnbcFPZKQgtZpW7cWuhGuyh/MLlLH3QENbuVlQx+oEYIyq6N1irOjkAsgvaiN09GX3LnN5ueQs5NiQ4WipqgAW6EZCqK6ntUu2e05CDIjIPwuFculdB26SakEDgngJoUjUDmBEMwFG3CdfCB4dlGU8tlXXypo32QXsNRYcqY1DXZKpGTFTCbHKDPFJI8pzBufYoGrvSyQXQg6FKxRhSNQShcJykFwoEnNcmFIFBM1ykEmOUPdK5Qf/9k\\x3d",
// 			"title": "Mysterious Space Object 'Oumuamua Not Alien, Scientists Say",
// 			"description": "Nearly six years ago, a space object roughly the size of a football field \nbaffled scientists as it zipped through our solar system.",
// 			"date": "2 days ago",
// 			"link": "https://www.wsj.com/articles/mysterious-space-object-oumuamua-not-alien-scientists-say-d6f2ccd0"
// 		},
// 		{
// 			"source": "European Space Agency",
// 			"thumbnail": "data:image/jpeg;base64,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",
// 			"title": "ESA - Earth from Space: Monterrey, Mexico",
// 			"description": "This Copernicus Sentinel-2 image features the diverse landscape surrounding \nMonterrey, the capital of the northeast state of Nuevo León,...",
// 			"date": "9 hours ago",
// 			"link": "https://www.esa.int/ESA_Multimedia/Images/2023/03/Earth_from_Space_Monterrey_Mexico"
// 		}
// 	],
// 	"pagination": {
// 		"pagesCount": 5,
// 		"currentPage": 1,
// 		"nextPageUrl": "https://www.google.com/search?q=Space&tbm=nws&ei=F_QdZIvwKtijptQP4pyFiAU&start=10&sa=N&ved=2ahUKEwjL17ruoPX9AhXYkYkEHWJOAVEQ8tMDegQIAxAE",
// 		"prevPageUrl": null,
// 		"pages": [
// 			{
// 				"page": 2,
// 				"url": "https://www.google.com/search?q=Space&tbm=nws&ei=F_QdZIvwKtijptQP4pyFiAU&start=10&sa=N&ved=2ahUKEwjL17ruoPX9AhXYkYkEHWJOAVEQ8tMDegQIAxAE"
// 			},
// 			{
// 				"page": 3,
// 				"url": "https://www.google.com/search?q=Space&tbm=nws&ei=F_QdZIvwKtijptQP4pyFiAU&start=20&sa=N&ved=2ahUKEwjL17ruoPX9AhXYkYkEHWJOAVEQ8tMDegQIAxAG"
// 			},
// 			{
// 				"page": 4,
// 				"url": "https://www.google.com/search?q=Space&tbm=nws&ei=F_QdZIvwKtijptQP4pyFiAU&start=30&sa=N&ved=2ahUKEwjL17ruoPX9AhXYkYkEHWJOAVEQ8tMDegQIAxAI"
// 			},
// 			{
// 				"page": 5,
// 				"url": "https://www.google.com/search?q=Space&tbm=nws&ei=F_QdZIvwKtijptQP4pyFiAU&start=40&sa=N&ved=2ahUKEwjL17ruoPX9AhXYkYkEHWJOAVEQ8tMDegQIAxAK"
// 			},
// 		]
// 	}
// }