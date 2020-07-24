const router = require("express").Router()
const Student = require("../../models/student")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
//jwt token : header + payload + verify signature
router.post("/", (req, res) => {
    //Get attributes from req.body
    const { name, email, password, phonenumber, aboutme, city, country, company, school, hometown, languages, gender } = req.body
    if (!name || !email || !password || !phonenumber || !city || !country || !gender) {
        return res.status(400).json({ msg: "Please fill out the missing fields" })
    }
    //Find if student exists
    Student.findOne({email})
        .then(student => {
            if (student) {
                return res.status(400).json({msg: "Student data already exists"})
            }
            //create a new student schema
            const newStudent = new Student({
                name: name,
                email: email,
                password: password,
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

            //create salt and hash using bcryptjs
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newStudent.password, salt, (err, hash) => {
                    if (err) throw err;
                    newStudent.password = hash;
                    newStudent.save()
                        .then(student => {
                            //Create JWT in response
                            //sign a token
                            jwt.sign(
                                //add payload as studentID
                                { id: student.id },
                                //get the secret value
                                config.get("jwtSecret"),
                                // token expiry in seconds
                                { expiresIn: 3600 },
                                // asynchronous call back function
                                (err, token) => {
                                    if (err) throw err;
                                    //send the response here
                                    res.json({
                                        //pass the token here
                                        token:token,
                                        student: {
                                            id: student.id,
                                            name: student.name,
                                            email: student.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })

        })
        .catch(err => {
            if (err) return err;
        })
})

module.exports = router