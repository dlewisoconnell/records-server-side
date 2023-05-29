const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// API endpoint to serve the records.json file
app.get('/api/records', (req, res) => {
  const records = require('./records.json');
  res.json(records);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
