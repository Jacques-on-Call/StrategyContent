# Deployment Instructions

This document provides instructions on how to set up and deploy the Proposal Tool application.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local instance or a cloud-based service like MongoDB Atlas)

## Local Development Setup

### Backend (Server)

1.  Navigate to the `server` directory:
    ```bash
    cd "proposal tool/server"
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following environment variables:
    ```
    ATLAS_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    CRYPTO_SECRET=<your_32_byte_hex_crypto_secret>
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000`.

### Frontend (Client)

1.  Navigate to the `client` directory:
    ```bash
    cd "proposal tool/client"
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm start
    ```
    The React application will run on `http://localhost:3000`.

## Production Deployment

### General Steps

1.  **Build the React App:**
    In the `client` directory, run the build command:
    ```bash
    npm run build
    ```
    This will create a `build` folder with the optimized, static assets of the React application.

2.  **Configure the Express Server to Serve Static Assets:**
    Modify the `server/server.js` file to serve the contents of the `client/build` folder.

    ```javascript
    // Add this to server.js
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('../client/build'));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
      });
    }
    ```
    You will also need to import the `path` module: `const path = require('path');`.

3.  **Set Environment Variables:**
    On your deployment server, set the same environment variables as in your local `.env` file (`ATLAS_URI`, `JWT_SECRET`, `CRYPTO_SECRET`). Also, set `NODE_ENV=production`.

4.  **Run the Server:**
    Start the Express server on your deployment machine. It's highly recommended to use a process manager like `pm2` to keep the application running continuously.
    ```bash
    npm install -g pm2
    pm2 start server.js
    ```

### Hosting on Namecheap

-   **Shared Hosting:** Standard Namecheap shared hosting plans primarily support PHP and may not be suitable for running a Node.js application directly. You might be able to run it if you have SSH access and can install Node.js, but it's not a standard configuration.
-   **VPS or Dedicated Server:** The recommended approach for hosting this application on Namecheap is to use one of their VPS (Virtual Private Server) or dedicated server plans. This will give you full control over the server environment, allowing you to install Node.js, MongoDB, and any other required software. You can then follow the general deployment steps above.
