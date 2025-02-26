import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the entire client dist folder
app.use(express.static('dist'));

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect the routes middleware
app.use(routes);

// Start the server on the specified port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
