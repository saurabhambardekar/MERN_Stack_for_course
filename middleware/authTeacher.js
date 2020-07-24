const config = require("config")
const jwt = require("jsonwebtoken")

//create a middleware function
//pass request,response,next

function authTeacher(req, res, next) {
    //fetch token from header
    const token = req.header('authTeacher-token')
    if (!token) {
        //Unauthorised Teacher
       res.status(401).json({ msg: "Token Invalid, deny authorization" })
    }
    //Token exists!
    try {
        const decode = jwt.verify(
            token,
            config.get('jwtSecret')
        )
        //Get teacher data from payload
        req.teacher = decode
        next()
    }
    catch (err) {
        //in case of invalid token throw error
        res.status(400).json({ msg: "Invalid Token" })
    }
}
module.exports = authTeacher