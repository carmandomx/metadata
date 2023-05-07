import express from "express";
import path from 'node:path';
import { fileURLToPath } from "node:url";


const app = express();
const PORT = 5000;
const hostname = 'localhost';

// Route for html file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, 'views');

// Define routes for API
const v1 = express.Router();
const apiPath = '/api';

// Endpoint convert date
v1.get('/:date', (req, res) => {
    // Get date from URL
    const date = req.params.date;

    // Verify if date is valid
    const timestamp =  isNaN(date) ? Date.parse(date) : parseInt(date);

    if (isNaN(timestamp)) {
        // Return 400 error if not valid
        res.status(400).json({ error: 'Date non-valid' });
    }
    else {
        const dateObj = new Date(timestamp);
        // Convert date to Epoch
        const epoch = dateObj.getTime();
        // Convert date to GMT
        const gmt = dateObj.toGMTString();
    
        // Return on JSON
        res.json({ epoch, gmt });
    }

});

// Main Route to index.html file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: viewsPath });
});

// Route for API
app.use(apiPath, v1);

// Listening server
app.listen(PORT, hostname, () => {
    console.log(`Server listening on ${hostname}:${PORT}`);
});