const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", 
    }]
},{timestamps:true});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;