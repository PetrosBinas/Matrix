"use strict";

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req,res) => {
    console.log("Someone Watches");
})

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
})
