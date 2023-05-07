import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apiRouter from "./routes/apiRouter.js";

const app = express();
const PORT = 3000; //Definition the port
const HOST_NAME = "localhost"; //Definition of the hostname

//Get the directory path of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/api", apiRouter); //Delegate requests to the "/api" path (and its subpaths) to the apiRouter. (Check the apiRouter.js file)

app.get("/", (req, res) => {
  //Endpoint to the root ulr, that will load the index.html file.
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, HOST_NAME, () => {
  //Listen to the designed port.
  console.log(`Server started on port ${PORT}`);
});
