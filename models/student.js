const mongoose = require("mongoose")

//create a student schema
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    aboutme: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    company: {
        type:String
    },
    school: {
        type: String
    },
    hometown: {
        type: String
    },
    languages: {
        type: String
    },
    gender: {
        type: String,
        required:true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;