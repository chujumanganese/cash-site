import express from "express";
import dotenv from "dotenv";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

var PORT = 8000;


app.get("/", (req, res)=>{
    res.render("home");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${ PORT }`)
})