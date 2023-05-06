import express from "express";

const router = express.Router();

// Helper function to check if a given date is valid
const isValidDate = (date) => {
  return !isNaN(date.getTime());
};

// Define the route for '/api/:date' with a GET request
router.get("/:date", (req, res) => {
  const inputDate = req.params.date;
  let date;

  let regex = /^\d+$/;

  // Check if the input is a Unix timestamp (integer), otherwise treat it as a human-readable date
  if (regex.test(inputDate)) {
    date = new Date(+inputDate * 1000);
  } else {
    date = new Date(inputDate);
  }

  // If the date is valid, return both Unix and UTC time, otherwise return an error with a 400 status code
  if (isValidDate(date)) {
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const utcTime = date.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcTime });
  } else {
    res.status(400).json({ error: "Invalid date" });
  }
});
// Export the router to be used in index.js
export default router;
