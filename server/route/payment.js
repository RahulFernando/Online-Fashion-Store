const express = require('express');
const router = express.Router();

const {History} = require('../models/purchaseHistory'); //purchse History schema

router.post('/add', (req, res) => {

    const userId = req.body.userId;
    const paymentMethod = req.body.paymentMethod;
    const date = Date.parse(req.body.date);
   
    console.log(userId,paymentMethod,date)

    const newPayment = new History({
        userId,
        paymentMethod
    });

    newPayment.save()
        .then(() => res.json({status: 200,_id: newPayment._id,}))
        .catch(err => res.status(400).json('Error : ' + err));
})


router.post('/addPurchaseHistory/:id', (req, res) => {


    History.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: {

                purchasedItems: {
                    id: req.body.itemID,
                    quantity: req.body.quantity

                }
            }

            },

        {new: true },

        () => {
            res.status(200).json({success: true})
        }
        
    )


    
})



module.exports = router;