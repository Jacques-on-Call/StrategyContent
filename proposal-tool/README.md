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
