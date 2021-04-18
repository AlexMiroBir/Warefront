const jwt = require('jsonwebtoken')


module.exports = function (status) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer[0]
            if (!token) {
                res.status(401).json({message: "Not authorized"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.Status !== status){
                res.status(403).json({message: "Access denied"})
            }
            req.user = decoded
            next()
        } catch (err) {
            res.status(401).json({message: "Not authorized"})
        }


    }
}