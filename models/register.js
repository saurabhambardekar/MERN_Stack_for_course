const mongoose = require("mongoose")

//create a registration schema
const RegisterSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: true
    },
    teachername: {
        type: String,
        required: true
    },
    studentname: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

const Register = mongoose.model('register', RegisterSchema);

module.exports = Register;