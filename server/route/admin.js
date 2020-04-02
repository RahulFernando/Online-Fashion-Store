//modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin'); //admin schema

router.post('/register', (req, res) => {
    let newAdmin = Admin({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    Admin.addAdmin(newAdmin, (err, admin) => {
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
                message: 'New admin registered'
            })
        }
    })
});

router.post('/login', (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   Admin.getAdminByUsername(username, (err, admin) => {
       if (err) throw err;
       if (!admin) {
           res.json({
               status: 400,
               message: "Invalid"
           })
       }

       Admin.comparePassword(password, admin.password, (err, isMatch) => {
           if (err) throw err;
           if (isMatch) {
                const token = jwt.sign({
                    type: "admin",
                    data: {
                        _id: admin._id,
                        username: admin.username,
                        email: admin.email
                    }
                }, process.env.SECRET, {
                        expiresIn: 50000 // for 5 min
                    }
                );
               return res.json({
                   status: 200,
                   type: 'admin',
                   token: 'Bearer '+token
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