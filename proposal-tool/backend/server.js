const express = require('express');
const proposalRoutes = require('./routes/proposal');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/proposal', proposalRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
