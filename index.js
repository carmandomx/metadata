const express = require("express");
const path = require("path");
const app = express();

// serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// create a v1 router for the API
const v1Router = express.Router();

// handle the /api/:date endpoint
v1Router.get("/api/:date", (req, res) => {
  const dateStr = req.params.date;
  let date;

  // try to parse the date as an epoch time
  if (/^\d+$/.test(dateStr)) {
    date = new Date(parseInt(dateStr, 10) * 1000);
  } else {
    // try to parse the date as a human-readable date string
    date = new Date(dateStr);
  }

  // check if the date is valid
  if (isNaN(date)) {
    res.status(400).send("Invalid date");
    return;
  }

  // convert the date to epoch time and GMT time
  const epochTime = Math.floor(date.getTime() / 1000);
  const gmtTime = date.toUTCString();

  // send the response
  res.json({ unix: epochTime, utc: gmtTime });
});

// mount the v1 router to the /api path
app.use("/", v1Router);

// start the server on port 5000
app.listen(5000, "localhost", () => {
  console.log("Server started on http://localhost:5000");
});
