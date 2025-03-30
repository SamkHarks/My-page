# My Portfolio Website

This repository contains the source code for the frontend of my personal portfolio website. It showcases some of my skills and offers a glimpse into my journey and identity as a developer.

## Deployment

The portfolio is a **work in progress (WIP)** and is currently hosted live at [Render](https://samis-portfolio.onrender.com).

## Features

### Core Experience
- **Multilingual Support**: View all content in English or Finnish - switch seamlessly anytime.
- **Responsive Design**: Fully adaptive and visually intriguing layout for all device sizes

### Page Sections
- **Home**: Engaging introduction with key highlights
- **About**: Professional background and personal journey
- **Skills**: Interactive display of technical competencies
- **Contact**: Integrated communication channels

### Advanced Components
- **Modal:** A dynamic, reusable pop-up that seamlessly displays additional content in context—keeping users on the page. Currently supports:
    - **CV preview**: Automatically displays my CV in Finnish or English based on your selected language preference. Includes option to open in new tab for full-view reading or downloading.
- **Error Handling Framework**:
  - **Error Boundaries**:
    - Gracefully captures runtime errors and network failures
    - Context-aware recovery (retry failed actions or full reload)
    - Custom error classification system (`HandledError`)
  - **Loading States**:
    - Unified loading indicators across async operations
    - Configurable presentation modes
  - **User Experience**:
    - Localized error messages (i18n integrated)
    - Customizable UI variants (text/icon/default)
    - Themed appearance matching site design

## Tech Stack and CI/CD

My website is built and maintained using a range of technologies and a simple CI/CD pipeline, ensuring a balance of quality and efficiency:

- **Frontend Development**:
    - **React**: Component-based architecture with functional components
    - **TypeScript**: Strong static typing for better maintainability and developer experience
    - **Styling**:
        - Modern CSS with responsive design principles
        - SVG components for resolution-independent graphics
    - **State Management**:
        - **React Hooks**: For component-level state and effects
        - **Zustand**: Lightweight global state management with:
            - Minimal boilerplate
            - Optimized re-renders for modal as multiple modal consumers won't cause unnecessary re-renders
    - **Internationalization**:
        - **i18next**: Robust translation framework supporting:
            - English/Finnish language switching
            - Dynamic content localization
    - **Graphics & Animation**:
        - **WebGL**: GPU-accelerated 2D visuals using:
            - Custom shaders
            - Performance-optimized rendering
            - Smooth animation integration with React

- **Build System**:
    - **Webpack** (with optimizations):
        - Production-ready bundling with code splitting (`splitChunks`)
        - Cache-busting through content hashing (`[contenthash]`)
        - Tree-shaking via `usedExports` and TerserPlugin
        - CSS extraction and minification (MiniCssExtractPlugin)
        - Asset optimization (images as `asset/resource`)
        - Static file handling (CopyWebpackPlugin)
    - **Babel & TypeScript**:
        - `@babel/preset-env` for browser compatibility
        - React JSX runtime (automatic)
        - TypeScript transpilation (`@babel/preset-typescript`)
        - Typescript only for Type checking and `.d.ts` generation
    - **Development Tools**:
        - Hot-reloading dev server (port 3000)
        - Source maps (`inline-source-map`)
        - On-the-fly linting (ESLint flat config)
        - HTML template management (HtmlWebpackPlugin)

- **Data Management**:
    - **Data Fetching**: Content is dynamically loaded from JSON files within the repository, using custom hooks for fetching data. Larger assets e.g. images served via Firebase hosting.

- **CI/CD**:
    - **GitHub Actions**: Automates the integration and deployment process, running tests and linting on each push, ensuring code quality.
    - **Render**: The website is hosted on Render. Deployments are manually triggered through the CI/CD pipeline for greater control and precision in the update process.

## Layout and Animation

- The site employs a user-friendly layout with interactive and engaging animations.
- Sections are designed to provide a smooth user experience, with transitions and animations adding to the visual appeal.

## Contributing

This project is personal.
