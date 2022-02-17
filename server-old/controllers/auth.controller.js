// Import the model
const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Get environment variables
require('dotenv/config');

module.exports = {
    register: (req, res) => {
        const user = req.body

        User.findOne({email: user.email})
            .then(candidate => {
                if (candidate) return res.status(400).json({success: false, result: "This user already exists!"})

                bcrypt.hash(user.password, 12)
                    .then((hash) => {
                        user.password = hash

                        new User(user).save()
                            .then(() => {
                                res.json({success: true, result: "User has been created!"})
                            })
                            .catch(err => res.status(400).json({success: false, result: err}))
                    })
            })
            .catch(err => res.status(400).json({success: false, result: err}))
    },
    login: (req, res) => {
        const {email, password} = req.body

        if (!email) return res.status(400).json({success: false, result: "Missing fields!"})
        if (!password) return res.status(400).json({success: false, result: "Missing fields!"})

        User.findOne({email: email})
            .then(user => {
                if (!user) return res.status(400).json({success: false, result: "Email or password is incorrect!"})

                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({success: false, result: "Password is incorrect!"})

                        const token = jwt.sign(
                            {userId: user.id},
                            process.env.JWT_SECRET,
                            {expiresIn: '24h'}
                        )

                        res.json({success: true, result: {token, userId: user.id}})
                    })
            })
            .catch(err => res.json({success: false, result: err}))
    },
    getUserByToken: (req, res) => {

        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                res.status(401).json({success: false, result: 'User not found!'})
            }

            let user = jwt.verify(token, process.env.JWT_SECRET)

            User.findById(user.userId)
                .then(user => {
                    res.json({success: true, result: user})
                })
        } catch (e) {
            res.status(401).json({success: false, result: 'User is not authenticated!'})
        }
    },
    update: (req, res) => {
        User.updateOne({_id: req.body._id}, req.body)
            .then(result => {
                if (!result) res.json({success: false, result: "User does not exist"});

                res.json({success: true, result: "User has been successfully updated!"});
            })
            .catch(err => {
                res.json({success: false, result: err});
            });
    },
}
