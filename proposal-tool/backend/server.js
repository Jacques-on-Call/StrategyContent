const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { calculateTotalCost } = require('../tools/cost_calculator');
const { trackUsage } = require('../tools/usage_tracker');

const app = express();
const port = process.env.PORT || 3001;

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

app.post('/api/proposals/:id/track-usage', (req, res) => {
  const proposalId = req.params.id;
  // 1. Get the proposal from the database
  db.query('SELECT * FROM Proposals WHERE ProposalID = ?', [proposalId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).send('Proposal not found');
      return;
    }
    const proposal = results[0];
    // 2. Track the usage
    trackUsage(proposal);
    res.send('Usage tracked successfully');
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

// API routes for proposal services
app.post('/api/proposal_services', (req, res) => {
  const newProposalService = req.body;
  db.query('INSERT INTO Proposal_Services SET ?', newProposalService, (err, result) => {
    if (err) throw err;
    res.status(201).send(`Proposal service added with ID: ${result.insertId}`);
  });
});

app.delete('/api/proposal_services/:id', (req, res) => {
  const proposalServiceId = req.params.id;
  db.query('DELETE FROM Proposal_Services WHERE ProposalServiceID = ?', proposalServiceId, (err, result) => {
    if (err) throw err;
    res.send('Proposal service deleted successfully');
  });
});


// API routes for proposals
app.get('/api/proposals', (req, res) => {
  db.query('SELECT * FROM Proposals', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/proposals', (req, res) => {
  const newProposal = req.body;
  db.query('INSERT INTO Proposals SET ?', newProposal, (err, result) => {
    if (err) throw err;
    res.status(201).send(`Proposal added with ID: ${result.insertId}`);
  });
});

app.put('/api/proposals/:id', (req, res) => {
  const proposalId = req.params.id;
  const updatedProposal = req.body;
  db.query('UPDATE Proposals SET ? WHERE ProposalID = ?', [updatedProposal, proposalId], (err, result) => {
    if (err) throw err;
    res.send('Proposal updated successfully');
  });
});

app.delete('/api/proposals/:id', (req, res) => {
  const proposalId = req.params.id;
  db.query('DELETE FROM Proposals WHERE ProposalID = ?', proposalId, (err, result) => {
    if (err) throw err;
    res.send('Proposal deleted successfully');
  });
});

app.get('/api/proposals/:id/calculate-cost', (req, res) => {
  const proposalId = req.params.id;
  // 1. Get proposal services and tools from the database
  const getServicesQuery = 'SELECT s.* FROM Services s JOIN Proposal_Services ps ON s.ServiceID = ps.ServiceID WHERE ps.ProposalID = ?';
  const getToolsQuery = 'SELECT t.* FROM Tools t JOIN Service_Tools st ON t.ToolID = st.ToolID JOIN Proposal_Services ps ON st.ServiceID = ps.ServiceID WHERE ps.ProposalID = ?';

  db.query(getServicesQuery, [proposalId], (err, services) => {
    if (err) throw err;
    db.query(getToolsQuery, [proposalId], (err, tools) => {
      if (err) throw err;
      // 2. Calculate the total cost
      const { totalCost, clientPrice } = calculateTotalCost(services, tools);
      res.json({ totalCost, clientPrice });
    });
  });
});

// API routes for clients
app.get('/api/clients', (req, res) => {
  db.query('SELECT * FROM Clients', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/clients', (req, res) => {
  const newClient = req.body;
  db.query('INSERT INTO Clients SET ?', newClient, (err, result) => {
    if (err) throw err;
    res.status(201).send(`Client added with ID: ${result.insertId}`);
  });
});

app.put('/api/clients/:id', (req, res) => {
  const clientId = req.params.id;
  const updatedClient = req.body;
  db.query('UPDATE Clients SET ? WHERE ClientID = ?', [updatedClient, clientId], (err, result) => {
    if (err) throw err;
    res.send('Client updated successfully');
  });
});

app.delete('/api/clients/:id', (req, res) => {
  const clientId = req.params.id;
  db.query('DELETE FROM Clients WHERE ClientID = ?', clientId, (err, result) => {
    if (err) throw err;
    res.send('Client deleted successfully');
  });
});

// API routes for tools
app.get('/api/tools', (req, res) => {
  db.query('SELECT * FROM Tools', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/tools', (req, res) => {
  const newTool = req.body;
  db.query('INSERT INTO Tools SET ?', newTool, (err, result) => {
    if (err) throw err;
    res.status(201).send(`Tool added with ID: ${result.insertId}`);
  });
});

app.put('/api/tools/:id', (req, res) => {
  const toolId = req.params.id;
  const updatedTool = req.body;
  db.query('UPDATE Tools SET ? WHERE ToolID = ?', [updatedTool, toolId], (err, result) => {
    if (err) throw err;
    res.send('Tool updated successfully');
  });
});

app.delete('/api/tools/:id', (req, res) => {
  const toolId = req.params.id;
  db.query('DELETE FROM Tools WHERE ToolID = ?', toolId, (err, result) => {
    if (err) throw err;
    res.send('Tool deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
