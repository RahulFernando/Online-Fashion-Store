//modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user'); //admin schema

router.post('/register', (req, res) => {
    let newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            let message = "";
            if (err.errors.username) message = "Username is already taken ";
            if (err.errors.email) message += "Email already exists";
            return res.json({
                success: false,
                message
            })
        } else {
            return res.json({
                status: 200,
                message: 'New user registered'
            })
        }
    })
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                status: 400,
                message: "Invalid user"
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                        type: "users",
                        data: {
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        }
                    }, process.env.SECRET, {
                        expiresIn: 60000 // for 1 minute
                    }
                );
                return res.json({
                    status: 200,
                    type: 'user',
                    _id: user._id,
                    token: 'Bearer ' + token
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Invalid Password"
                })
            }
        })
    })
});

// get authenticated admin profile
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        return res.json(
            "hello world"
        )
    } catch (e) {

    }
});

module.exports = router;