const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const Model = require('../models/rating');


router.get('/', (req, res) => {
    //getting all the ratings
    Model
        .find()
        .then(list => {
            //sending the list
            res.status(200).json(list)
        })
        .catch(error => {
            //sending error code 400 and attach the error occured as a json to the response.
            res.status(400).json(error)
        });
});

module.exports = router;