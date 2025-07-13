const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection (replace with your actual credentials)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'proposal_tool'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Proposal Tool API');
});

// API routes for services
app.get('/api/services', (req, res) => {
  db.query('SELECT * FROM Services', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/services', (req, res) => {
  const newService = req.body;
  db.query('INSERT INTO Services SET ?', newService, (err, result) => {
    if (err) throw err;
    res.status(201).send(`Service added with ID: ${result.insertId}`);
  });
});

// Add more routes for other tables (Tools, Proposals, etc.)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
