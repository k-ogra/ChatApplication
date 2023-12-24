const express = require('express');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get('/', (req,res) => {
    res.send("API running");
});

app.listen(4000, console.log("Server running"));