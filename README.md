# My Portfolio Website

This repository contains the source code for the frontend of my personal portfolio website. It showcases some of my skills and offers a glimpse into my journey and identity as a developer.

## Deployment

The portfolio is now live and accessible at:
🌐 [portfolio](https://samis-portfolio.onrender.com/)

**Hosting:** Deployed via [Render](https://render.com/)

## Features

### Core Experience
- **Multilingual Support**: View all content in English or Finnish - switch seamlessly anytime.
- **Responsive Design**: Fully adaptive and visually intriguing layout for all device sizes

### Page Sections
- **Home**: Engaging introduction with key highlights
- **About**: Professional background and personal journey
- **Skills**: Interactive display of technical competencies
- **Contact**: Integrated communication channels

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
