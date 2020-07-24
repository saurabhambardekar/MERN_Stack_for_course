const config = require("config")
const jwt = require("jsonwebtoken")

//create a middleware function
//pass request,response,next

function authStudent(req, res, next) {
    
    //fetch token from header
    const token = req.header('authStudent-token')
    if (!token) {
        //Unauthorised Student
        return res.status(401).json({ msg: "Token Invalid, deny authorization" })
    }
    //Token exists!
    try {
        const decode = jwt.verify(
            token,
            config.get('jwtSecret')
        )
        //Get student data from payload
        req.student = decode
        next()
        
    }
    catch (err) {
        //in case of in valid token throw error
        return res.status(400).json({msg:"Invalid Token"})
    }
}

module.exports = authStudent