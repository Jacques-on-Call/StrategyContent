# Proposal Tool

This is a developer onboarding tool for creating proposals. It is a full-stack application with a React frontend, a Node.js backend, and a MySQL database.

## Architecture

The application is divided into three main parts:

*   **Frontend:** The frontend is a single-page application built with React and Vite. It is responsible for rendering the user interface and making API calls to the backend.
*   **Backend:** The backend is a Node.js application built with Express. It is responsible for handling API requests from the frontend, interacting with the database, and performing business logic.
*   **Database:** The database is a MySQL database that stores all the application data.

### Frontend

The frontend is located in the `frontend` directory. It is a standard Vite-based React application. The main files are:

*   `index.html`: The main HTML file that loads the React application.
*   `vite.config.js`: The Vite configuration file.
*   `src/main.jsx`: The entry point of the React application.
*   `src/App.jsx`: The main application component.
*   `public/style.css`: The main stylesheet.

### Backend

The backend is located in the `backend` directory. It is a standard Node.js application with Express. The main files are:

*   `server.js`: The main server file that starts the Express application.
*   `config.js`: The configuration file that contains the database credentials.
*   `database.js`: The file that connects to the MySQL database.
*   `routes/proposal.js`: The file that defines the API routes for proposals.

### Database

The database schema is defined in the `database/schema.sql` file. It consists of four tables:

*   `clients`: Stores information about the clients.
*   `proposals`: Stores information about the proposals.
*   `services`: Stores information about the services offered.
*   `tools`: Stores information about the tools used.

## Workflow

The application follows a sales-led proposal journey:

1.  A salesperson starts a new proposal by filling in the client's name, project intent, and other details.
2.  The tool captures data from the client interview, such as challenges, goals, and budget.
3.  The tool calculates the cost of the proposal based on the selected services and tools.
4.  The client receives an interactive proposal that they can use to simulate different scenarios.
5.  The client signs the proposal, which locks the selection and sends notifications to the relevant parties.

## Key Features

The application has the following key features:

*   Proposal generation
*   Tool usage tracking
*   Client logo and branding upload
*   Admin portal for cost edits
*   Proposal signing
*   Pricing simulation
*   Notification on resource limits
*   Proposal storage in MySQL
*   JWT authentication (planned for a future phase)
