document.getElementById('books-mood').addEventListener('change', function() {
    const mood = this.value;
    const topics = moodBooks[mood];
    if (topics) {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        // console.log("Selected mood:", mood);
        // console.log("Random topic:", randomTopic);
        document.getElementById('books-search').value = randomTopic;
    } else {
        console.log("No topics found for the selected mood");
    }
});


// document.getElementById('books-mood').addEventListener('change', function() {
//     const mood = this.value;
//     const topics = moodBooks[mood];
//     const randomTopic = topics[Math.floor(Math.random() * topics.length)];
//     document.getElementById('books-search').value = randomTopic;
// });