const mysql = require('mysql2');
const config = require('./config');

const db = mysql.createConnection(config.db);

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = db;
