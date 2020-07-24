const mongoose = require("mongoose")

// create a course schema
const CourseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: true
    },
    teachername: {
        type: String,
        required: true
    },
    coursedetails: {
        type: String,
        required: true
    },
    coursedepartment: {
        type: String,
        required: true
    },
    courseroom: {
        type: String,
        required: true
    },
    waitlistCapacity: {
        type: Number,
        required: true
    },

    register_date: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;