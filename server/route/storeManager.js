//modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const StoreManager = require('../models/storeManager'); //storeManager schema

// add new storeManager
router.post('/register', passport.authenticate('jwt', { session: false }), (req, res) => {
    let newStoreManager = StoreManager({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    StoreManager.addStoreManager(newStoreManager, (err, storeManager) => {
        if (err) {
            let message = "";
            if (err.errors.username) message = "Username is already taken ";
            if (err.errors.email) message += "Email already exists";
            return res.json({
                success: false,
                message
            })
        } else {
            StoreManager.sendEmail(newStoreManager.email, newStoreManager.username, (err) => {
                if (err) {
                    console.log(err)
                }else {
                    console.log("Mail send")
                }
            })
            return res.json({
                status: 200,
                message: 'New storeManager registered'
            })
        }
    })
});

// storeManager login
router.post('/login', (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   StoreManager.getStoreManagerByUsername(username, (err, storeManager) => {
       if (err) throw err;
       if (!storeManager) {
           return res.json({
               status: 400,
               message: "Invalid username"
           })
       }

       StoreManager.comparePassword(password, storeManager.password, (err, isMatch) => {
           if (err) throw err;
           if (isMatch) {
                const token = jwt.sign({
                    type: "storeManager",
                    data: {
                        _id: storeManager._id,
                        username: storeManager.username,
                        email: storeManager.email
                    }
                }, process.env.SECRET, {
                        expiresIn: 5000 // for 5 min
                    }
                );
               return res.json({
                   status: 200,
                   type: 'storeManager',
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
})

// get all store mangers
router.get('/storeManagers', passport.authenticate('jwt', { session: false }), (req, res) => {
    StoreManager.getAllStoreManagers((err, storeManager) => {
        if (err) {
            return json({
                success: false
            })
        }else {
            res.send(storeManager)
        }
    })
})

// update store managers
router.put('/storeManagers/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const storeManager = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    StoreManager.getStoreManagerByID(req.params.id, (err, store) => {
        if (err) throw err;
        if (!store) {
            return res.json({
                status: 400
            })
        }
        
        StoreManager.updateStoreManagers(req.params.id, store.password, storeManager, (err) => {
            if (!err) {
                return res.json({ message: 'Updated' })
            }
            return res.send(err)
        })
    })
})

// delete store managers 
router.delete("/storeManagers/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    StoreManager.deleteStoreManagers(req.params.id, (err) => {
        if (!err) {
            res.send(req.params.id + " deleted")
        } else {
            console.log(err)
        }
    })
})

// get authenticated storeManager profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
        return res.json(
            "hello world"
        )

})

module.exports = router;