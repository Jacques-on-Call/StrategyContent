require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const proposalsRouter = require('./routes/proposals');
app.use('/proposals', proposalsRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Proposal Tool API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
