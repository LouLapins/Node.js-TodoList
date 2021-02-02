const express = require("express");
const bodyParser = require("body-parser"); //För att kunna läsa EJS body data
const mongoose = require("mongoose");
const Task = require("./model/task");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");


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

app.get("/", async(req, res) => {

    const data = await Task.find();

    res.render("index.ejs", { data: data });
})

app.post("/", async(req, res) => {

    await new Task({ name: req.body.name }).save();
    console.log(req.body.name);

    res.redirect("/");

})

// DELETE //

app.get("/delete/:id", async(req, res) => {

    await Task.deleteOne({ _id: req.params.id });

    res.redirect("/");
})


// EDIT //

app.get("/edit/:id", async(req, res) => {

    const task = await Task.findOne({ _id: req.params.id });

    res.render("edit.ejs", { task: task });

})

app.post("/edit", async(req, res) => {

    console.log(req.body);

    await Task.updateOne({ _id: req.body.id }, { name: req.body.name })

    res.redirect("/")
})