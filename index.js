import express from "express";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";

const app = express();
const db = sqlite3.verbose();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

var PORT = 8000;

// database part of the code
const database = new db.Database("./user.db");
let sql_one = `CREATE TABLE USERS(

)`
// database.run()

app.get("/", (req, res)=>{
    res.render("home");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/dashboard", (req, res)=>{
    res.render("dashboard");
})

app.get("/link", (req, res)=>{
    res.render("link_account");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${ PORT }`)
})