const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Course = require("../../models/course")

const Teacher = require("../../models/teacher")
const authTeacher = require("../../middleware/authTeacher")

//get all courses from db
router.get('/', async (req, res) => {
    try {
        const course = await Course.find();
        console.log("Course")
        if (!course) throw Error('No Courses!');

        res.status(200).json(course);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
//Courses by a particular teacher
router.get('/course/:teachername', async (req, res) => {
    const { teachername } = req.params
    Course.find({ teachername: teachername })
        .then(course => {
            return res.status(200).json({ course })
        })
        .catch(err => {
            return res.status(400).json({msg: "No Courses"})
        })
})

//only authorized teacher can add courses
router.post('/'
    , async (req, res) => {
    const { coursename, teachername, coursedetails, coursedepartment, courseroom, waitlistCapacity } = req.body
    if (!coursename || !teachername || !coursedepartment || !courseroom || !waitlistCapacity) {
        return res.status(400).json({ msg: "Please fill out the missing fields" })
    }
    //create a new course schema
    const newCourse = new Course({
        coursename: coursename,
        teachername: teachername,
        coursedetails: coursedetails,
        coursedepartment: coursedepartment,
        courseroom: courseroom,
        waitlistCapacity: waitlistCapacity
    });

    try {
        const course = await newCourse.save();
        if (!course) throw Error('Something went wrong adding the course');

        res.status(200).json(course);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//profile update for teacher
router.put('/update', authTeacher, function (req, res) {
    const { name, email, phonenumber, aboutme, city, country, company, school, hometown, languages, gender } = req.body
    Teacher.findOneAndUpdate({
        email: email
    }, {
        name:name,
        phonenumber: phonenumber,
        aboutme: aboutme,
        city: city,
        country: country,
        company: company,
        school: school,
        hometown: hometown,
        languages: languages,
        gender: gender
     }, function (err,result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(
                {
                    msg: "Profile Updated",
                    name: name,
                    phonenumber: phonenumber,
                    aboutme: aboutme,
                    city: city,
                    country: country,
                    company: company,
                    school: school,
                    hometown: hometown,
                    languages: languages,
                    gender: gender
                });
        }
    });
});

//password update for teacher
router.put('/update-pass',  function (req, res) {
    const { email, password } = req.body
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newpassword = hash;
            Teacher.findOneAndUpdate({
                email: email
            }, {
                password: newpassword
            }, function (err, result) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).json({ msg: "Password reset successful" });
                    }
            });
        })
    })
    
});
module.exports = router