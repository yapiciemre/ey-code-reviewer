# EY Code Reviewer

![EY Code Reviewer Logo](components\docs\logo.png)

**EY Code Reviewer** is an AI-powered code analysis tool that acts as an automated teammate, providing instant, expert-level, and highly-structured feedback on your code. Built with React, TypeScript, and the power of Google's Gemini API, this application helps developers accelerate their workflow and improve code quality by providing a comprehensive review that goes far beyond simple suggestions.

## Simple Example & Tabbed Interface Structure Screenshots

### **Analyzing Part**
![Application Screenshot](components\docs\1-Analyzing.png)

### **Analysis Tab**
![Application Screenshot](components\docs\2-Analysis.png)

### **Refactored Code Tab**
![Application Screenshot](components\docs\3-RefactoredCode.png)

### **Minimal Diff Tab**
![Application Screenshot](components\docs\4-MinimalDiff.png)

### **Tests Tab**
![Application Screenshot](components\docs\5-Tests.png)

### **TODO Tab**
![Application Screenshot](components\docs\6-TODO.png)

## About The Project

As a portfolio project, EY Code Reviewer demonstrates the advanced integration of a powerful Large Language Model (LLM) into a modern web application to solve a real-world developer problem. It provides a seamless user experience with a clean, intuitive, and tab-based interface that presents complex information in a digestible and actionable format.

The goal was to create a tool that is not only functional but also reliable and polished, showcasing skills in frontend development, UI/UX design, and sophisticated prompt engineering.

## Features

-   ✨ **Comprehensive & Structured Analysis:** The AI provides a rich, multi-faceted review including:
    -   **Summary:** A high-level overview of the code quality.
    -   **Issues:** A detailed list of problems, categorized by severity (Critical, Medium, Low).
    -   **Refactored Code:** The complete, improved code ready to be used.
    -   **Minimal Diff:** A git-style diff highlighting the exact changes.
    -   **Suggested Tests:** AI-generated unit tests to verify the refactored code.
    -   **Complexity Analysis:** A Big-O notation breakdown of the code's performance.
    -   **TODO List:** An actionable checklist of next steps for the developer.
-   💻 **Tab-Based UI:** The rich analysis is presented in a clean, modern, tabbed interface, allowing users to easily navigate between different sections of the review.
-   🚀 **Multi-Language Support:** Review code in popular languages like JavaScript, Python, TypeScript, Java, C#, Go, and more.
-   📋 **Markdown & Code Blocks:** All feedback is rendered in clean Markdown, with syntax-highlighted code blocks that are easy to read and copy.
-   👆 **One-Click Copy:** Easily copy suggested code snippets and diffs to your clipboard.
-   ⚡ **Example Loaders:** Instantly test the application's capabilities with pre-loaded code examples for multiple languages.
-   📱 **Responsive Design:** A fully responsive interface that works flawlessly on all devices.

## Why This Approach? (Engineering Decision)

An early version of this tool used a streaming text response from the AI. While this felt "live," it was unreliable and limited the depth of the analysis.

The decision was made to switch to a **highly structured JSON response** by defining a strict and complex `responseSchema` for the Gemini API. This approach is superior for several key reasons:

1.  **Reliability & Consistency:** The application receives a predictable, well-defined data structure every time. This eliminates parsing errors and ensures a stable UI, even if the AI's "prose" changes.
2.  **Unlocks a Rich UI/UX:** Structured data is the only way to power a sophisticated interface like the tabbed review panel. Each piece of data (diff, tests, issues) can be directed to a specific, purpose-built component.
3.  **Demonstrates Advanced AI Integration:** This approach shows a deeper understanding of how to control and leverage LLMs. Instead of just accepting a text block, it forces the model to perform specific, structured tasks, turning it from a simple "chatbot" into a predictable and powerful analysis engine.

This change represents a shift from a simple demo to a robust, product-oriented application that showcases advanced engineering thinking.

## Tech Stack

This project is built with a modern and robust tech stack:

-   **Frontend:** [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **AI:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`) with a highly-structured `responseSchema`.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Code Editor:** [React Simple Code Editor](https://github.com/satya164/react-simple-code-editor)
-   **Syntax Highlighting:** [PrismJS](https://prismjs.com/)
-   **Markdown Rendering:** [React Markdown](https://github.com/remarkjs/react-markdown)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   A package manager like `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/yapiciemre/ey-code-reviewer.git
    cd ey-code-reviewer
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    You'll need a Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

    Create a `.env` file in the root of the project. **Important:** Because this is a client-side application built with Vite, environment variables exposed to the browser **must** be prefixed with `VITE_`.

    Add your API key to the `.env` file like this:
    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in your browser.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Emre YAPICI - [LinkedIn](https://www.linkedin.com/in/yapiciemre)
