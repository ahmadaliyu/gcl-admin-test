# Technical Documentation for GCL Frontend

## Overview

The **GCL Frontend** is a web application built using **Next.js** and **TailwindCSS**. It is designed to provide a responsive and dynamic user interface for various features such as user authentication, dashboard management, payments, notifications, and more. The project leverages modern web development tools and libraries to ensure scalability, maintainability, and performance.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Key Technologies](#key-technologies)
3. [Dependencies](#dependencies)
4. [Scripts](#scripts)
5. [Development Setup](#development-setup)
6. [Features](#features)
7. [Styling](#styling)
8. [API Integration](#api-integration)
9. [Testing](#testing)
10. [Deployment](#deployment)

---

## Project Structure

The project follows a modular structure to ensure scalability and maintainability. Below is an overview of the key directories and files:

```md
/src
├── components
│ ├── layout
│ │ └── user
│ │ └── user-dashboard-wrapper
│ ├── pages
│ │ ├── auth
│ │ │ ├── login.tsx
│ │ │ └── register.tsx
│ │ ├── user
│ │ │ ├── account-settings
│ │ │ ├── my-bookings
│ │ │ ├── my-payments-and-invoices
│ │ │ ├── my-saved-addresses
│ │ │ └── support-and-help-center
│ ├── reuseables
│ │ ├── Button
│ │ ├── InputField
│ │ ├── SelectField
│ │ ├── faqs
│ │ │ └── components
│ │ │ └── AccordionList
│ └── ui
│ ├── checkbox
│ ├── dropdown-menu
│ ├── select
│ ├── slider
│ └── table
├── constants
│ ├── country-codes.ts
│ └── enums.ts
├── styles
│ ├── globals.css
│ └── tailwind.css
├── utils
│ ├── api.ts
│ └── helpers.ts
```

### Key Directories

- **`components`**: Contains reusable UI components and page-specific components.
- **`pages`**: Implements the Next.js routing system with pages for authentication, user dashboard, and other features.
- **`reuseables`**: Houses reusable components like buttons, input fields, and dropdowns.
- **`ui`**: Contains Radix UI-based components for dropdowns, sliders, and tables.
- **`constants`**: Stores application-wide constants such as country codes and enums.
- **`styles`**: Contains global and TailwindCSS configurations.
- **`utils`**: Utility functions for common operations.

---

## Key Technologies

### Frameworks and Libraries

- **Next.js**: A React-based framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **Radix UI**: A library of accessible, unstyled UI components.
- **Formik**: For form handling and validation.
- **Yup**: Schema validation for forms.
- **Axios**: For making HTTP requests.

### State Management

- State is managed locally using React's `useState` and `useReducer` hooks.

---

## Dependencies

### Core Dependencies

- **`next`**: Framework for server-side rendering and static site generation.
- **`react`**: Core library for building user interfaces.
- **`tailwindcss`**: Utility-first CSS framework for styling.
- **`axios`**: HTTP client for API integration.

### UI and Styling

- **`@radix-ui/react-*`**: Radix UI components for dropdowns, sliders, and more.
- **`clsx`**: Utility for conditionally joining class names.
- **`tailwind-merge`**: Merges TailwindCSS classes dynamically.

### Form Handling

- **`formik`**: Form handling and validation.
- **`yup`**: Schema validation for forms.

### Utilities

- **`date-fns`**: Utility library for date manipulation.
- **`html2canvas`**: For rendering HTML elements into canvas.
- **`jwt-decode`**: Decodes JSON Web Tokens.

### Dev Dependencies

- **`eslint`**: Linting for JavaScript and TypeScript.
- **`typescript`**: TypeScript support for type safety.
- **`tailwindcss`**: TailwindCSS configuration and utilities.

---

## Scripts

### Available Scripts

- **`dev`**: Starts the development server.
- **`build`**: Builds the application for production.
- **`start`**: Starts the production server.
- **`lint`**: Runs ESLint to check for code quality issues.

---

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GCL-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server

```bash
   npm run dev
```

4. Open the application in your browser at http://localhost:3000.

## Features

- Authentication

- User Dashboard

- Payments

- Notifications

- Support and Help Center

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

## Deployment

The GCL Frontend is a robust and scalable application built with modern web technologies. Its modular structure, reusable components, and integration with TailwindCSS make it easy to maintain and extend.
