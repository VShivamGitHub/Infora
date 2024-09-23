// const moodTopics = require("./articles/js/data");

document.addEventListener('DOMContentLoaded', () => {
    const moodTopicsArticles = moodTopics; // Example values
    const moodTopicsBooks = moodBooks; // Example values
    
    const cards = document.querySelectorAll('.card1');

    /**************************************************************************************/
    /****************** article ***********************************************************/
    const cardArticle = document.getElementById('card-articles');
    cardArticle.addEventListener('click', () => {
        cards.forEach(c => c.style.backgroundColor = "#c5b652" );
        cardArticle.style.backgroundColor = "#d3bb21";
        const target = cardArticle.getAttribute('data-target');
        // updateDropdown(moodTopicsArticles,'articles-mood');
        document.getElementById('searchFormArticles').action = "/articles/search";
    });

    const articleDropDown = document.getElementById('articles-mood');
    articleDropDown.addEventListener('change', function() {
        const mood = this.value;
        const topics = moodTopicsArticles[mood];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        document.getElementById('articles-search').value = randomTopic;
    });

    const searchformArticle = document.getElementById('searchFormArticles');
    searchformArticle.addEventListener('submit', function(event) {
        const selectedOption = document.getElementById('articles-mood');
        const searchInput = document.getElementById('articles-search').value;
        if (!selectedOption || searchInput.trim() === '') {
          alert('Please select a checkbox or enter a search term.');
          event.preventDefault();
        }
    });

    /*****************************************************************************/
    /******************************* books ***************************************/
    const cardBooks = document.getElementById('card-books');
    cardBooks.addEventListener('click', () => {
        cards.forEach(c => c.style.backgroundColor = "#c5b652" );
        cardBooks.style.backgroundColor = "#d3bb21";
        const target = cardBooks.getAttribute('data-target');
        document.getElementById('searchFormBooks').action = "/books/store";
    });

    document.getElementById('books-mood').addEventListener('change', function() {
        const mood = this.value;
        const topics = moodTopicsBooks[mood];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        document.getElementById('books-search').value = randomTopic;
    });

    const searchformBooks= document.getElementById('searchFormBooks');
    searchformBooks.addEventListener('submit', function(event) {
        const selectedOption = document.getElementById('books-mood');
        const searchInput = document.getElementById('books-search').value;
        if (!selectedOption || searchInput.trim() === '') {
          alert('Please select a checkbox or enter a search term.');
          event.preventDefault();
        }
    });
});


// In this code "  const cardBooks = document.getElementById('card-books');
//     cardBooks.addEventListener('click', () => {
//         cards.forEach(c => c.style.backgroundColor = "#c5b652" );
//         cardBooks.style.backgroundColor = "#909090";
//         const target = cardBooks.getAttribute('data-target');
//         document.getElementById('searchFormBooks').action = "/books/store";
//     });   " i wanted to add box-shadow property in cardBooks . How do i do that ?