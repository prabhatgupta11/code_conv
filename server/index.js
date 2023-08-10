const express = require('express');
const cors = require('cors');
const { codeRoute } = require('./routes/routes');
const path=require("path")
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/code', codeRoute);



const port = process.env.PORT || 5000; // Default to port 5000 if PORT is not defined in the environment variables.

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
