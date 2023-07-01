const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const loginModel = require('../models/Login')

class AuthenticationController {
    static async login(req, res) {
        try {
            const { email, password } = req.body

            const login = await loginModel.findOne({ where: { email } })

            if (!login) {
                return res.status(401).json({ message: 'Invalid email' })
            }

            const compareResult = await bcrypt.compare(password, login.password)

            if (!compareResult) {
                return res.status(401).json({ message: 'Invalid password' })
            }

            const token = jwt.sign({ login_id: login.id, email: login.email }, 'secret_key')
            const reftoken = jwt.sign({ login_id: login.id, email: login.email }, 'secret_key2')

            return res.status(200).json({ auth: true, token: token, refreshToken: reftoken })

        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Server Error' })
        }
    }

    static async logout(req, res) {
        return res.json({ auth: false, token: null })
    }

    static async refreshToken(req, res) {
        const reftoken = req.body.refreshToken

        if (!reftoken) {
            return res.status(403).json({ auth: false, message: 'No refresh token provided' })
        }

        jwt.verify(reftoken, 'secret_key2', (err, login) => {
            if (err) {
                return res.status(403).json({ auth: false, message: 'Invalid refresh token' })
            }

            const newtoken = jwt.sign({ login_id: login.id, email: login.email }, 'secret_key')

            res.json({ refreshToken: newtoken })
        })

    }

}

module.exports = AuthenticationController