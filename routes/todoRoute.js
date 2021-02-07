const express = require("express");
const Task = require("../model/task");
const router = express.Router();


// READ //

router.get("/", async(req, res) => {

    const sorted = +req.query.sorted || 1;
    const page = +req.query.page || 1;

    try {
        const totalData = await Task.find().countDocuments();

        const dataToShowPerReq = 5;

        const totalPages = Math.ceil(totalData / dataToShowPerReq);

        const dataToShow = dataToShowPerReq * page;

        const data = await Task.find().limit(dataToShow).sort({ date: sorted });

        res.render("index.ejs", { id: req.params.id, data, totalData, totalPages, dataToShow, dataToShowPerReq, errors: "empty" })

    } catch (err) {
        res.render("error.ejs", { error: err })
    }

})

// CREATE // 

router.post("/", async(req, res) => {

    console.log(req.body.name);
    try {
        await new Task({ name: req.body.name }).save();
        res.redirect("/");

    } catch (err) {
        res.render("error.ejs", { error: err })
    }

})


// UPDATE (EDIT) //

router.get("/edit/:id", async(req, res) => {

    const task = await Task.findOne({ _id: req.params.id });

    res.render("edit.ejs", { task: task });

})

router.post("/edit", async(req, res) => {

    console.log(req.body);

    await Task.updateOne({ _id: req.body.id }, { name: req.body.name })

    res.redirect("/")
})


// DELETE //

router.get("/delete/:id", async(req, res) => {

    await Task.deleteOne({ _id: req.params.id });

    res.redirect("/");
})



module.exports = router;