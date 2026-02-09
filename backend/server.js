"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["POST","GET"],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());


app.post("/signup", (req,res) => {
    const { email, password } = req.body;
    console.log(email,password);
    res.status(200).json({ message: "Signup Successful" });
});


app.post("/login", (req,res) => {
    const { email, password } = req.body;
    console.log(email,password);
    res.status(200).json({ message: "Login Successful"});
})


app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});
