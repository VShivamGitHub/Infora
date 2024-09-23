

// Dropdown selection handling using the moodTopics from data.js
const moodDropdown = document.getElementById('moodDropdown');
const searchInput = document.getElementById('searchInput');

moodDropdown.addEventListener('change', function () {
    const selectedMood = moodDropdown.value;
    if (selectedMood) {
        const topics = moodTopics[selectedMood];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        searchInput.value = randomTopic;
    }
});