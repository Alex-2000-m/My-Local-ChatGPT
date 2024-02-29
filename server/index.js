const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');


const app = express();
// Add middleware for parsing URL encoded bodies
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(bodyParser.json());

dotenv.config();

// Add routes
app.use('/', chatRoutes); 

const port = process.env.PORT || 3000;

// Add middleware for handling CORS preflight requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
