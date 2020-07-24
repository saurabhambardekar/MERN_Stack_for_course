const router = require("express").Router()
const Teacher = require("../../models/teacher")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")

router.post("/", (req, res) => {
    //get attributes from req.body
    const { name, email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill out the missing fields" })
    }
    // authorize teacher
    Teacher.findOne({ email })
        .then(teacher => {
            if (!teacher) {
                return res.status(400).json({ msg: "Invalid Professor" })
            }
            bcrypt.compare(password, teacher.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" })

                    //Case:matched passwords
                    jwt.sign(
                        //add payload as studentID
                        { id: teacher.id },
                        //get the secret value
                        config.get("jwtSecret"),
                        // token expiry in seconds
                        { expiresIn: 3600 },
                        // asynchronous call back
                        (err, token) => {
                            if (err) throw err;
                            //send the response here
                            res.json({
                                //pass the token here
                                token: token,
                                teacher: {
                                    id: teacher.id,
                                    name: teacher.name,
                                    email: teacher.email
                                }
                            })
                        }
                    )
                })
                .catch(err => {
                    if (err) return err;
                })
        })
        .catch(err => {
            if (err) return err;
        })
})

module.exports = router