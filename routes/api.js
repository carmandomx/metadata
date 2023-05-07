import { Router } from "express";


const apiRouter = Router();

apiRouter.get("/:date", (req, res) => {
    const queryDate = req.params.date 
    const date = new Date(queryDate * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
      // Tries to validate epoch date first
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        // If false tries to validate human format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(queryDate)) {
            // If format is wrong sends error
            res.send("error 404, date not found")
          }
          // If true tries to get the years month and days
          const date = new Date(queryDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          // If values are in correct ranges set the right values to the response
          if (
            isNaN(year) || isNaN(month) || isNaN(day) ||
            year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31
          ) {
            // If wrong sends error
            res.send("error 404, date not found")
          }
        
          const utc = date.toUTCString()
          const unix = date.getTime()
            const dateObj = { unix, utc }
            res.json(dateObj)
        }
     // If true set this values
    const unix = date.getTime()/1000
    const utc = date.toUTCString()
    const dateObj = { unix, utc }

  // Devolver objeto de fecha
    res.json(dateObj)
  });

export default apiRouter;