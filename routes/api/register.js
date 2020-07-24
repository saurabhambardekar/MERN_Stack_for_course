const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Register = require("../../models/register")
const Student = require("../../models/student")
const authStudent = require("../../middleware/authStudent")

//get all registrations
router.get('/', async (req, res) => {
    try {
        const register = await Register.find();
        if (!register) throw Error('You have not registered!');

        res.status(200).json(register);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
// Student Registered for a particular course
router.get('/register/:course', async (req, res) => {
    const coursename = req.params.course
    Register.find({ coursename: coursename })
        .then(register => {
            return res.status(200).json({ register })
        })
        .catch(err => {
            return res.status(400).json({ msg: "No Courses" })
        })
})
// Student's Registered  course
router.get('/course/:studentname', async (req, res) => {
    const { studentname } = req.params
    Register.find({ studentname: studentname })
        .then(course => {
            return res.status(200).json({ course })
        })
        .catch(err => {
            return res.status(400).json({ msg: "No Courses" })
        })
})
//only authorized student can register for a course
router.post('/', async (req, res) => {
    const { coursename, teachername, studentname } = req.body
    //create a register schema
    const newRegister = new Register({
        coursename: coursename,
        teachername: teachername,
        studentname: studentname,
    });

    try {
        const register = await newRegister.save();
        if (!register) throw Error('Something went wrong during registration');

        res.status(200).json(register);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//get Student Profile
router.get('/student/:email', async (req, res) => {
    const email = req.params.email
    Student.findOne({
        email:email
    })
        .then(student => {
            if (!student) {
                return res.status(400).json({ msg: "Invalid Student Data" })
            }
            return res.status(200).json({ student })
        })
        .catch(err => {
            return res.status(400).json({ msg: "No Student " })
        })
})
//profile update for authorized students

router.put('/update', function (req, res) {
    const { name, email, phonenumber, aboutme, city, country, company, school, hometown, languages, gender } = req.body
    Student.findOneAndUpdate({
        email: email
    }, {
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
    }, function (err, result) {
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

//password update for students
router.put('/update-pass',authStudent, function (req, res) {
    const { email, password } = req.body
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newpassword = hash;
            Student.findOneAndUpdate({
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