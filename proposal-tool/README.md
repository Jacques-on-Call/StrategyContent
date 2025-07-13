# Proposal Tool

This tool is used to generate proposals for clients. It consists of a React frontend and a Node.js backend.

## Installation

To install the dependencies for both the frontend and backend, run the following command from this directory:

```
npm install
```

## Running the Tool

To run both the frontend and backend servers concurrently, run the following command from this directory:

```
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend will be running on port 3001.

## Managing Costs and Prices

The costs and prices for the services are managed in the backend. To update them, you will need to modify the following files:

- `proposal-tool/tools/cost_calculator.js`: This file contains the logic for calculating the costs of the services.
- `proposal-tool/database/schema.sql`: This file defines the database schema, including the tables that store the prices for the services.

After modifying these files, you will need to restart the backend server for the changes to take effect.

## cPanel Database Setup

1.  **Log in to your cPanel account.**
2.  **Navigate to the "MySQL Databases" section.**
3.  **Create a new database.**
    *   Enter a name for your database (e.g., `proposal_tool`) and click "Create Database".
4.  **Create a new database user.**
    *   Enter a username and password for your database user and click "Create User".
5.  **Add the user to the database.**
    *   Select the user and the database from the dropdown menus and click "Add".
    *   Grant all privileges to the user and click "Make Changes".
6.  **Import the database schema.**
    *   Navigate to the "phpMyAdmin" section in cPanel.
    *   Select the database you created from the left-hand menu.
    *   Click on the "Import" tab.
    *   Click "Choose File" and select the `database/schema.sql` file from this project.
    *   Click "Go" to import the schema.
7.  **Configure the application.**
    *   Rename the `.env.example` file in the `backend` directory to `.env`.
    *   Open the `.env` file and replace the placeholder values with your database credentials.
