import express from "express";
import  v1  from "./routes/index.js"
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 5000;
const HOST_NAME = "localhost";

app.use("/v1",v1)

const __filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(__filename);

// Serve the index.html file when accessing the root path
app.get("/", (req, res) => {
  res.sendFile(currentDirname + "/views/index.html");
});


app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening at http://${HOST_NAME}:${PORT}`);
  });