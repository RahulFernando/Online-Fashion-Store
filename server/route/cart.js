const express = require('express');
const router = express.Router();

const User = require('../models/user'); //user schema

//Add items to the Cart
router.route('/add/:id').post((req,res) => {


    User.findOne({ _id: req.params.id }, (err, userInfo) => {
        let alreadyInCart = false;

        userInfo.Cart.forEach((item) => {

        
            if (item.id == req.body.itemID) {
                alreadyInCart = true;
                
            }
        })

        if (alreadyInCart) {


        console.log("This item is already in the cart ")

          User.findOneAndUpdate(
                { _id: req.params.id, "Cart.id": req.body.itemID},
                { $inc: { "Cart.$.quantity": 1 } },
                { new: true },
                () => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.addToCart)
                }
            )

       
        } else {

            console.log("In the else clause")
            
            User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        Cart: {
                            id: req.body.itemID,
                            quantity: 1
                        }
                    }

                    },

                {new: true },

                 (err, userInfo) => {
                     if (err) return res.json({ success: false, err });
                     res.status(200).json(userInfo.Cart)
                }    
                
            )
    
    
  }

})



})

//Display Cart Items

router.route('/display/:id').get((req,res) => {

    User.findById(req.params.id)
    .then(user=> res.json(user))
    .catch(err => res.status(400).json('Error : '  +err));
})


//Delete items from the cart

router.route('/delete/:id').post((req,res) => {

    User.findOneAndUpdate(
       { _id: req.params.id },
       {
           $pull: {
            Cart: {
                   id: req.body.itemID
               }
           }

           },

       {new: true },

        (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.Cart)
       }    
       
   )
})



module.exports = router;