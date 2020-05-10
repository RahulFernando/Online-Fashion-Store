const express = require('express');
const router = express.Router();

const {History} = require('../models/purchaseHistory'); //purchse History schema

router.route('/displayReciept/:id').get((req,res) => {

    History.findById(req.params.id)
        .then(history => res.json(history))
        .catch(err => res.status(400).json('Error : '  +err));

});


module.exports = router;