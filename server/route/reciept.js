const express = require('express');
const router = express.Router();

const {History} = require('../models/purchaseHistory'); //purchse History schema

router.route('/displayReciept/:id').get(async(req,res) => {
    try {           
        await History.findById(req.params.id)
        .then(history => res.json(history))
        .catch(err => res.status(400).json('Error : '  +err));
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;