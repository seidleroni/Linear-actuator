# Project Structure

This document provides a detailed walkthrough of the project structure and the role of each file in the Linear Actuator Motion Calculator.

## Root Directory

*   `.github/workflows/deploy.yml`: This GitHub Actions workflow automates the deployment of the application to GitHub Pages.
*   `.gitignore`: This file specifies which files and directories should be ignored by Git.
*   `App.tsx`: This is the main React component that brings together all the different parts of the application.
*   `constants.ts`: This file defines the constant values for the parameters, such as the minimum, maximum, and default values for distance, velocity, acceleration, and deceleration.
*   `index.html`: This is the main HTML file that serves as the entry point for the application.
*   `index.tsx`: This is the entry point for the React application. It renders the `App` component into the `root` element in `index.html`.
*   `package.json`: This file lists the project's dependencies and defines the scripts for running, building, and previewing the application.
*   `README.md`: This file provides an overview of the project.
*   `tsconfig.json`: This file contains the configuration for the TypeScript compiler.
*   `types.ts`: This file defines the TypeScript types used throughout the application.
*   `vite.config.ts`: This file contains the configuration for the Vite build tool.

## `components/` Directory

This directory contains the reusable React components used in the application.

*   `Footer.tsx`: This component displays the footer at the bottom of the page.
*   `MotionProfileChart.tsx`: This component uses the `recharts` library to display the motion profile chart.
*   `ParameterSlider.tsx`: This component provides a slider for adjusting the motion parameters.
*   `ResultDisplay.tsx`: This component displays the total time for the motion.

## `hooks/` Directory

This directory contains the custom React hooks used in the application.

*   `useMotionProfile.ts`: This hook contains the core logic for calculating the motion profile. It takes the motion parameters as input and returns the total time and the data for the chart.
