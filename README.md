# Newsify Web Application

## Overview
Newsify is a web application designed to deliver personalized news content to users. The platform aggregates news articles from various sources and provides an intuitive and user-friendly interface for exploring the latest headlines. Built with modern web technologies, Newsify is optimized for performance and scalability.

## Features

1. **News Curation**
   - **Technologies Used**:
     - **API Integration**: News Data API to fetch articles.
     - **Backend**: Supabase for storing and managing categorized articles.
     - **Frontend**: React for rendering categorized news topics dynamically.
   - **Description**:
     - Aggregate news from multiple sources using APIs like News Data API.
     - Categorize news by topics: Politics, Technology, Sports, Health, Entertainment, etc.

2. **AI-Powered Summarization**
   - **Technologies Used**:
     - **AI Framework**: Hugging Face (LLM locally installed) for text summarization.
     - **Backend**: Node.js to handle AI model interactions.
     - **Frontend**: React to display summaries alongside original articles.
   - **Description**:
     - Use an LLM Hugging Face (locally installed) to generate concise summaries of long news articles.
     - Display summaries alongside the original articles for user convenience.

3. **Personalized Recommendations**
   - **Technologies Used**:
     - **Algorithm**: TF-IDF (Term Frequency-Inverse Document Frequency) for content-based recommendations.
     - **Backend**: Supabase to store user preferences and reading history.
     - **Frontend**: React for displaying personalized content.
   - **Description**:
     - Leverage user preferences (selected topics, reading history) to recommend articles.
     - Use AI for context-aware suggestions, such as related news or follow-ups on ongoing stories.

4. **Sentiment Analysis**
   - **Technologies Used**:
     - **AI Framework**: Natural Language Processing (NLP) libraries like SpaCy or NLTK.
     - **Backend**: Node.js to handle sentiment analysis logic.
     - **Frontend**: React to allow filtering articles by sentiment.
   - **Description**:
     - Integrate AI to analyze the tone (positive, negative, neutral) of articles.
     - Allow users to filter news by sentiment (e.g., "Show me uplifting news").

5. **Trending Topics and Insights**
   - **Technologies Used**:
     - **Backend**: Supabase for storing trending topics.
     - **AI Framework**: NLP to analyze and generate topic insights.
     - **Frontend**: React for displaying real-time trends dynamically.
   - **Description**:
     - Display real-time trending topics and headlines.
     - Use AI to generate topic overviews or identify patterns in trending news.

6. **Interactive Features**
   - **Technologies Used**:
     - **AI Framework**: Hugging face gpt-neo for conversational AI discussions.
     - **Frontend**: React for chat interface.
     - **Backend**: Node.js for handling real-time interactions with the AI assistant.
   - **Description**:
     - AI Discussions: Enable chat-like discussions with an AI assistant that explains or debates news topics.

## Tech Stack

- **Frontend**: React (TypeScript), Tailwind CSS
- **Backend**: Supabase (Backend-as-a-Service)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Configuration Management**: PostCSS

## Directory Structure

### Root Directory

- **`.env`**: Contains environment variables.
- **`.gitignore`**: Specifies files to ignore in version control.
- **`README.md`**: Project documentation.
- **`index.html`**: Main HTML entry point.
- **`package.json` & `package-lock.json`**: Manage dependencies and scripts.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`tsconfig*.json`**: TypeScript configuration files.
- **`vite.config.ts`**: Configuration for the Vite build tool.

### `src` Directory

1. **`App.tsx`**: Main application component.
2. **`api/`**: Handles external API integrations.
3. **`components/`**: Contains reusable UI components.
4. **`config/`**: Application configuration files.
5. **`contexts/`**: Context providers for managing global state.
6. **`hooks/`**: Custom React hooks for reusable logic.
7. **`index.css`**: Base styling for the application.
8. **`lib/`**: Helper libraries for additional functionality.
9. **`main.tsx`**: Application entry point for React.
10. **`services/`**: Modules for API interactions and business logic.
11. **`types/`**: TypeScript type definitions.
12. **`utils/`**: Utility functions for common operations.
13. **`vite-env.d.ts`**: TypeScript declarations for Vite features.

## Setup and Installation

### Prerequisites

- Node.js and npm installed.
- Supabase account for backend setup.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SIRI1023/Newsify_webApp.git
   cd Newsify_webApp
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the required environment variables (e.g., API keys, database URL).

4. **Run the Application**:

   ```bash
   npm run dev
   ```

   Access the application at `http://localhost:3000`.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and submit a pull request.

## Contact

For any questions or feedback, please reach out at [shri23.govvala@gmail.com.

