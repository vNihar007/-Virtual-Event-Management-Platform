const jwt = require('jsonwebtoken')
const Users = require('../Models/user.models')

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({
            message: "Access Denied - No Token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({
            message: "Invalid Token"
        })
    }
}

const authorize = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Access Denied" })
            }
            next()
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }
}
module.exports.authenticate = authenticate;
module.exports.authorize = authorize;
