const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config.db);

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    return;
  }
  console.log('Successfully connected to the database.');
});

module.exports = connection;
