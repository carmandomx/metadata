import { Router } from "express";
import transformDate from "../source/dates.js";

const apiRouter = Router();

apiRouter.get("/:date", (req, res) => {
  const queryDate = req.params.date;
  const dateFunction = transformDate(queryDate);
  if(!dateFunction){
    res.send("error 404 not found")
  }else{
    res.send(dateFunction);
  }
});
          
export default apiRouter;