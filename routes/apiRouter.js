import express from "express";

const apiRouter = express.Router(); //Definition of the router called apiRouter.

//Function that will run when the server gets a GET request to the endpoint "http://localhost:3000/api/:date"
const handleDateRequest = (req, res) => {
  const dateParam = req.params.date; //Get the date parameter from the request and store it in a variable.
  let date; //Declaration of a variable named date that will be used later to store the parsed date object.

  if (/\d{10}/.test(dateParam)) {
    //This line checks if the dateParam is a 10-digit number (Unix timestamp), using the .test method that returns a boolean depending on the regular expresion passed
    //This line converts the Unix timestamp (dateParam) to a JavaScript Date object by multiplying it by 1000 (to convert seconds to milliseconds) and passing it to the new Date() constructor.
    //The resulting Date object is stored in the date variable.
    date = new Date(Number(dateParam) * 1000);
  } else if (/\d{4}-\d{2}-\d{2}/.test(dateParam)) {
    // If the dateParam is not a Unix timestamp, this line checks if it matches the "YYYY-MM-DD" format, also with the .test method.
    date = new Date(dateParam); //The resulting Date object is stored in the date variable.
  } else {
    return res.status(400).json({ error: "Invalid date format" }); //If the date parameter is not in those formats, return a status 400 (Bad Request) and a json object with an error message.
  }

  // If the dateParam has been successfully parsed and stored in the date variable:
  res.json({
    unix: date.getTime() / 1000, //This line gets the Unix timestamp from the date object (in milliseconds) by calling the getTime() method, divides it by 1000 to convert it to seconds, and stores it under the "unix" key in the JSON object.
    utc: date.toUTCString(), // This line converts the date object to a GMT (UTC) formatted string using the toUTCString() method and stores it under the "utc" key in the JSON object.
  });
};

apiRouter.get("/:date", handleDateRequest); // Defines a route in the apiRouter that listens for HTTP GET requests to a path with a single parameter, named "date".

export default apiRouter; //Export of the router
