import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from 'path'

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// define v1 router for API endpoints
const v1 = express.Router();

// define endpoint for /api/:date
v1.get('/:date', (req, res) => {
  const dateParam = req.params.date;

  // check if dateParam is a valid date in Epoch or Human time format
  const isEpochTime = /^\d+$/.test(dateParam);
  const isHumanTime = /^\d{4}-\d{2}-\d{2}$/.test(dateParam);

  if (!isEpochTime && !isHumanTime) {
    res.status(400).send('Invalid date format');
    return;
  }

  let unix,  utc;

  if (isEpochTime) {
    // convert Epoch time to Human and GMT time
    const date = new Date(parseInt(dateParam) * 1000);
    unix = parseInt(dateParam);
    utc = date.toGMTString();
  } else {
    // convert Human time to Epoch and GMT time
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      res.status(400).send('Invalid date format');
      return;
    }
    unix = Math.floor(date.getTime() / 1000);
    utc = date.toGMTString();
  }

  // send response with Epoch, Human, and GMT time
  res.json({
    unix: unix,
    utc: utc
  });
});

// mount v1 router at /api path
app.use('/api', v1);

// define root route to serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// start server
app.listen(5000, 'localhost', () => {
  console.log('Server started on http://localhost:5000');
});