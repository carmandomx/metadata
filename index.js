import express from "express";
import router from "./routes/v1.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const hostname = "localhost";
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(__filename);

// Serve the index.html file when accessing the root path
app.get("/", (req, res) => {
  res.sendFile(currentDirname + "/views/index.html");
});

// Mount the API router at the '/api' path
app.use("/api", router);

// Start the server on the specified hostname and port
app.listen(port, hostname, () => {
  console.log(`Server is listening at http://${hostname}:${port}`);
});
