import express from "express";
import settings from "./settings.js";
import path from "path";
import { fileURLToPath } from "url";
import v1 from "./routes/v1.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Loading routes
app.use("/v1/api", v1);

// open index.html file located in views folder, in case that the user
// make a get call to '/' rout
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Load Error 404 in case of page not found
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// Load Error 500 in case of server error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(settings.port, () => {
  console.log(`Server is listening at ${settings.host}${settings.port}`);
});
