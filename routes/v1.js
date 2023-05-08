import express from "express";
import date from "./../middlewares/date.js";

const v1 = express();

v1.get("/:date", date);

export default v1;
