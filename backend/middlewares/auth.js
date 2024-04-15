const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/constants')
exports.auth = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'failed',
                message: "Unauthorized. or Invalid User"
            })
        }
        req.decoded = decoded
        next();
    })
}
