const express = require('express');
const router = express.Router();

const User = require('../models/user'); //user schema

//Adding items to the WishList
router.route('/add/:id').post((req,res) => {

    console.log(req.params.id);
    console.log(req.body.itemID);

    User.findOne({ _id: req.params.id }, (err, userInfo) => {
        let alreadyInWishList = false;

        userInfo.WishList.forEach((item) => {

        
            if (item.id == req.body.itemID) {
                alreadyInWishList = true;
                
            }
        })

        if (alreadyInWishList) {


        console.log("This item is already in the wish List ")
       
        } else {

            console.log("In the else clause")
            
            
            
            User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        WishList: {
                            id: req.body.itemID
                        }
                    }

                    },

                {new: true },

                 (err, userInfo) => {
                     if (err) return res.json({ success: false, err });
                     res.status(200).json(userInfo.WishList)
                }    
                
            )
        
        

            
    
  }

})
})

//Display WishList
router.route('/display/:id').get((req,res) => {

     
    User.findById(req.params.id)
    .then(user=> res.json(user))
    .catch(err => res.status(400).json('Error : '  +err));
})

//Delete Wishlist Items

router.route('/delete/:id').post((req,res) => {

     User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $pull: {
                WishList: {
                    id: req.body.itemID
                }
            }

            },

        {new: true },

         (err, userInfo) => {
             if (err) return res.json({ success: false, err });
             res.status(200).json(userInfo. WishList)
        }    
        
    )
})

module.exports = router;