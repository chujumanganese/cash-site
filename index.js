import express from "express";
import sqlite3 from "sqlite3";
import {body, validationResult} from "express-validator";
import dotenv from "dotenv";

const app = express();
const db = sqlite3.verbose();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

var PORT = 8000;

// database part of the code
const database = new db.Database("./user.db");

function tables(){
    let sql_one = `CREATE TABLE IF NOT EXISTS USERS(
        id integer primary key AUTOINCREMENT , 
        email varchar(200),
        password varchar(255),
        chaining varchar(150),
        dates DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

    database.run(sql_one, (err) => {
        if (err) {
            console.log("The error is =>", err);
        } else {
            console.log("The users table is created");
        }
    });

}tables();

app.get("/", (req, res)=>{
    res.render("home");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.get("/register", (req, res)=>{
    res.render("register", {errors: 0, old: ""});
})

// dashboard part of the code

const userValidationRules = [
    body('emails').isEmail().withMessage('Valid email is required'),
    body('passwords').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

app.post("/register", userValidationRules, (req, res)=>{

    const { email, password, confirm_password, chaining } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render("register", { errors: errors.array(),  old: req.body });
    }

    res.redirect('/dashboard')
});

app.get("/dashboard", (req, res)=>{
    res.render("dashboard");
})

app.get("/link", (req, res)=>{
    res.render("link_account");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${ PORT }`)
})