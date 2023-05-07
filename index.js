import express from "express";
import moment from "moment";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const port = 5000;
const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// Serve index.html at root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API v1 router
const v1 = express.Router();
app.use('/api/v1', v1);

// API v1 endpoint to convert time
v1.get('/date/:date', (req, res) => {
  const dateParam = req.params.date;

  // Check if dateParam is in Epoch or Human time format
  let momentDate;
  if (Number.isInteger(parseInt(dateParam))) {
    // Epoch time format
    momentDate = moment.unix(dateParam);
  } else {
    // Human time format (YYYY-MM-DD)
    momentDate = moment(dateParam);
  }

  // Check if dateParam is a valid date
  if (!momentDate.isValid()) {
    res.status(400).json({ error: 'Invalid date format' });
    return;
  }

  // Convert to Epoch and GMT time
  const epochTime = momentDate.unix();
  const gmtTime = momentDate.utc().format();

  // Return converted times in JSON format
  res.json({
    epochTime: epochTime,
    gmtTime: gmtTime,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});