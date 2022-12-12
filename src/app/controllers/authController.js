const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authController {
    async userLogin (req, res) {
        try {
            
            const user = await User.findOne({username: req.body.username})
            if (user.type != 'admin') {
                return res.status(400).redirect('/')
                
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (user && validPassword) {
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                    },
                    "secretkey"
                )
                res.cookie("accessToken", accessToken, {
                    httpOnly: false,
                    secure: false,
                    sameSite: "strict"
                })
                res.redirect('/admin/user')
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    userLogout(req, res) {
        res.clearCookie('accessToken').redirect('/')
    }
}

module.exports = new authController()