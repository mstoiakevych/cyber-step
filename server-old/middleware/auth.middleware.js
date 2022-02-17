const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({success: false, result: 'User is not authenticated!'})
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.status(401).json({success: false, result: 'User is not authenticated!'})
    }
}
