const mongoose = require("mongoose");

//Defining a Schema
const taskSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;