const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

//Import all routes
const student = require("./routes/api/studentroute")
const teacher = require("./routes/api/teacherroute")
const courses = require("./routes/api/course")
const register = require("./routes/api/register")
const authStudent = require("./routes/api/authStudent")
const authTeacher = require("./routes/api/authTeacher")


const app = express()
app.use(express.json())

//get MongoURI
const db = config.get('mongoURI')

//connect to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
    .then(() => { console.log("connected to mongodb") })
    .catch((err) => { console.log(err) })
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader("Content-Type", "application/json");
	next();
});
//use all routes
app.use('/api/student', student)
app.use('/api/teacher', teacher)
app.use('/api/courses', courses)
app.use('/api/register', register)
app.use('/api/authStudent', authStudent)
app.use('/api/authTeacher', authTeacher)



const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on PORT ${port}`));