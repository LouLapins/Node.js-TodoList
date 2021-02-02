const express = require("express");
const bodyParser = require("body-parser"); //För att kunna läsa EJS body data
const mongoose = require("mongoose");
const router = require("./routes/todoRoute");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use("/", router);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DATABASE_URL,
    options,
    (err) => {

        console.log(err)
        if (err) return;

        console.log("Connected to database!");

        app.listen(process.env.PORT, () => {
            console.log("Application is running!");
        })

    })