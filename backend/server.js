"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// my modules
const db = require("./app.js");

const auth = require("./auth/hashing.js");

// cors origin permission
const corsOptions = {
  origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
  methods: ["POST", "GET"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// on signup POST we check the info for duplicates and create user
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPass = await auth.hashPassword(password);
  console.log(email, hashedPass);
  try {
    const data = await db.addUser(email, hashedPass);
    return res.status(201).json({ ok: true, data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ok: false, error: "FAIL" });
  }
});

// on login POST we start the credentials check and return success if OK
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const data = await db.logInUser(email);
    const password_hash = data.password_hash;
    const authed = await auth.checkPassword(password_hash,password);
    if(authed){
	return res.status(200).json({ ok: true, data });
    }else{
	return res.status(400).json({ ok:false, data:"Not Authed"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ok: false, error: "FAIL" });
  }
});

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
