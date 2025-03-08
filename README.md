# Speakflow Audio Translator

Speakflow Audio Translator is a web application that allows users to translate spoken audio from one language to another in real-time. It leverages speech recognition and translation APIs to provide a seamless translation experience.

## Features

-   **Real-time Audio Translation:** Translates spoken audio from a source language to a target language.
-   **Language Selection:** Supports multiple languages for both source and target.
-   **Text-to-Speech:** Converts the translated text into speech.
-   **User-Friendly Interface:** Simple and intuitive design for ease of use.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
-   **Vite:** A build tool that provides a fast and optimized development experience.
-   **React Query:** For managing, caching, and updating asynchronous data in React applications.
-   **MyMemory Translation API:** For translating text between languages.
-   **Web Speech API:** For speech recognition and text-to-speech functionality.

## Setup Instructions

Follow these steps to set up and run the Speakflow Audio Translator:

### Prerequisites

-   Node.js (version 16 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```sh
    cd speakflow-audio-translator
    ```

3.  Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

### Configuration

No specific configuration is required. The application uses the MyMemory Translation API, which is free to use with certain limitations.

### Running the Application

1.  Start the development server:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

## Usage

1.  **Select Languages:** Choose the source and target languages from the dropdown menus.
2.  **Start Recording:** Click the record button to start recording your speech.
3.  **Speak:** Speak clearly into your microphone. The transcribed text will appear in the "Original Text" area.
4.  **View Translation:** The translated text will appear in the "Translated Text" area.
5.  **Play Translation:** Click the play button to hear the translated text spoken aloud.
6.  **Stop Recording:** Click the record button again to stop recording.
