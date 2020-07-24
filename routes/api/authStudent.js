const router = require("express").Router()
const Student = require("../../models/student")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const studentAuth = require("../../middleware/authStudent")
//jwt token : header + payload + verify signature
router.post("/", (req, res) => {
    // get attributes from req.body
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill out the missing fields" })
    }
    Student.findOne({ email })
        .then(student => {
            if (!student) {
                return res.status(400).json({ msg: "Invalid Student Data" })
            }
            //compare the hash password on Atlas with password from req
            bcrypt.compare(password, student.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" })

                    //Case:matched passwords
                    jwt.sign(
                        //add payload as studentID
                        { id: student.id },
                        //get the secret value
                        config.get("jwtSecret"),
                        // token expiry in seconds
                        { expiresIn: 3600 },
                        // asynchronous call back

                        (err, token) => {
                            if (err) throw err;
                            //send the response here
                            //res.writeHead(200, { "Content-Type": "application/json" });
                            res.json({
                                //pass the token here
                                token: token,
                                student: {
                                    id: student.id,
                                    name: student.name,
                                    email: student.email
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