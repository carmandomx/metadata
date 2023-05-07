import { Router } from "express";
import apiRouter from "./api.js";

const v1 = Router();

v1.use("/api",apiRouter);

export default v1;
