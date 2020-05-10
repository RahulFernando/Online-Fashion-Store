const express = require('express');
const router = express.Router();

const {History} = require('../models/purchaseHistory'); //purchse History schema

router.post('/add', async (req, res) => {
    try {
        const userId = req.body.userId;
        const paymentMethod = req.body.paymentMethod;
        const date = Date.parse(req.body.date);
       
        console.log(userId,paymentMethod,date)
    
        const newPayment = new History({
            userId,
            paymentMethod,
            date
        });
    
        await newPayment.save()
            .then(() => res.json({status: 200,_id: newPayment._id,}))
            .catch(err => res.status(400).json('Error : ' + err));
    } catch (error) {
        console.log(error)
    }
})


router.post('/addPurchaseHistory/:id', async (req, res) => {
    try {
        await History.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
    
                    purchasedItems: {
                        id: req.body.itemID,
                        quantity: req.body.quantity,
                        itemname:req.body.itemName,
                        price: req.body.price
    
                    }
                }
    
                },
    
            {new: true },
    
            () => {
                res.status(200).json({success: true})
            }
            
        )
    
    } catch (error) {
        console.log(error)
    }
})

router.route('/displayPurchaseHistory/:id').get(async (req,res) => {
   try {
       await History.find({"userId":req.params.id})
        .then(history => res.json(history))
        .catch(err => res.status(400).json('Error : '  +err));
   } catch (error) {
        console.log(error)
   }
})


module.exports = router;