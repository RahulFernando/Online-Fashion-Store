const express = require('express');
const router = express.Router();

const Payment = require('../models/purchaseHistory'); //purchse History schema

router.post('/add', (req, res) => {


    const userId = req.body.userId;
    const paymentMethod = req.body.paymentMethod;
    const date = Date.parse(req.body.date);
   
    console.log(userId,paymentMethod,date)

    //const newPayment = new Payment();

    // newPayment.save()
    //     .then(() => res.json('Payment Done!'))
    //     .catch(err => res.status(400).json('Error : ' + err));
})

module.exports = router;