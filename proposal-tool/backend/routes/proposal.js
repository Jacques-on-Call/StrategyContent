const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  res.send('This is the proposal route.');
});

module.exports = router;
