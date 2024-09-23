# INFORA

INFORA is a multi-functional web application that brings together three different features: reading articles, checking the latest news, and buying books. It provides a user-friendly interface where users can explore mood-based articles, books, and stay updated with the latest news. The project is built using **HTML**, **CSS**, **JavaScript**, and **ExpressJS**.

## Features

1. **Read Articles:**
   - The user is presented with a form titled **"READ ARTICLE"**.
   - There is a mood-based **dropdown** to select different moods (e.g., Happy, Sad, Motivated).
   - Based on the selected mood, the app suggests a random article in the search bar using a pre-defined mood-to-article mapping.
   - The user can also manually enter an article topic in the search bar.

2. **Read Books:**
   - Another form is titled **"READ BOOKS"**, which works similarly to the article section.
   - The user can select a mood from the dropdown, and a random book title related to the mood will be shown in the search bar.
   - The user can also manually search for a book.

3. **Latest News:**
   - The page includes a news section where the latest news from different countries is displayed.
   - The news articles include titles, descriptions, published dates, and their sources.
   - The news section is dynamically rendered using **EJS** templates, and the news updates every time the page is refreshed.

## Project Structure

The project uses **ExpressJS** as the backend framework and **EJS** for rendering dynamic content. Here's an overview of the project layout:

- **Home Page**: Displays forms for reading articles and books, along with the latest news section.
- **Article and Book Pages**: After performing a search, users are directed to these pages, which show a list of articles or books based on the user's search query.
- **News Section**: Dynamically fetches and displays real-time news every time the page loads.

## Tools & Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: ExpressJS
- **Templating Engine**: EJS (Embedded JavaScript)
- **API Integration**: News data is fetched via an external news API.

## How It Works

1. **Mood-based Suggestions**:
   - The app has a pre-defined object that maps different moods (keys) to an array of relevant articles and books (values).
   - When the user selects a mood, an event listener captures the change, randomly selects a suggestion from the corresponding array, and displays it in the search bar.

2. **API Calls for News**:
   - The news section makes an API call to fetch the latest news data.
   - The data includes news title, description, source, and publication date, which are rendered dynamically using EJS and displayed on the page.

3. **Form Validation**:
   - Each form validates that the search bar is not empty before proceeding.
   - If validation fails, an alert is displayed, preventing the user from searching with an empty field.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VShivamGitHub/INFORA.git4

2. Start the website:
   ```bash
   https://infora-614q4d1bl-vshivam0808s-projects.vercel.app
