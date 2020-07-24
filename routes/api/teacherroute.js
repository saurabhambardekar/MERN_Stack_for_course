const router = require("express").Router()
const Teacher = require("../../models/teacher")
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
    //Find if teacher exists
    Teacher.findOne({ email })
        .then(teacher => {
            if (teacher) {
                return res.status(400).json({ msg: "Professor data already exists" })
            }
            //create a new teacher schema
            const newTeacher = new Teacher({
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
                bcrypt.hash(newTeacher.password, salt, (err, hash) => {
                    if (err) throw err;
                    newTeacher.password = hash;
                    newTeacher.save()
                        .then(teacher => {
                            //Create JWT in response
                            //sign a token
                            jwt.sign(
                                //add payload as teacherID
                                { id: teacher.id },
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
                                        teacher: {
                                            id: teacher.id,
                                            name: teacher.name,
                                            email: teacher.email
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