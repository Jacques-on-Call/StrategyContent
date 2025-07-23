const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.query('SELECT * FROM proposals', (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { client_id, summary, status } = req.body;
  db.query(
    'INSERT INTO proposals (client_id, summary, status) VALUES (?, ?, ?)',
    [client_id, summary, status],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

module.exports = router;
