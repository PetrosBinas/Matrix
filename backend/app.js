"use strict"

module.exports = { addUser, logInUser };

const { response } = require("express"); 

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "matrix",
    password: "mypass",
    port: 5432
});



async function addUser(email, hashedPass){
    const res = await pool.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email`,[email,hashedPass]);
    if(res.rows.length > 0){return res.rows[0]}
    else{return null}
}


async function logInUser(email) {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);
    if(res.rows.length > 0){return res.rows[0]}
    else{return null}
}
