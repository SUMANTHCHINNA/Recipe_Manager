const jwt = require('jsonwebtoken')
const { getUserById } = require('../model/index')
const dotenv = require('dotenv')
dotenv.config()

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
        if (token) {
            token = req.headers.authorization.split(' ')[1]
            const { _id } = jwt.verify(token, process.env.KEY)
            const user = await getUserById(_id)
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }
            req.user = { username: user.username, email: user.email, user_id: user.user_id }
            next()
        }
        else {
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

module.exports = auth