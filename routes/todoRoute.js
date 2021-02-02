const express = require("express");
const Task = require("../model/task");
const router = express.Router();



router.get("/", async(req, res) => {

    const data = await Task.find();

    res.render("index.ejs", { data: data });
})

router.post("/", async(req, res) => {

    await new Task({ name: req.body.name }).save();
    console.log(req.body.name);

    res.redirect("/");

})

// DELETE //

router.get("/delete/:id", async(req, res) => {

    await Task.deleteOne({ _id: req.params.id });

    res.redirect("/");
})


// EDIT //

router.get("/edit/:id", async(req, res) => {

    const task = await Task.findOne({ _id: req.params.id });

    res.render("edit.ejs", { task: task });

})

router.post("/edit", async(req, res) => {

    console.log(req.body);

    await Task.updateOne({ _id: req.body.id }, { name: req.body.name })

    res.redirect("/")
})

module.exports = router;