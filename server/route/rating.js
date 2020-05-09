const express = require('express');
const router = express.Router();
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

router.post('/',(req,res) => {
    //gathering all the required parameters to create a new rating
    var userId = req.body.userId;
    var productId = req.body.productId;
    var comment = req.body.comment;
    var numberOfStars = req.body.numberOfStars;

    var rate = new Model();
    rate.userId = userId;
    rate.productId = productId;
    rate.comment = comment;
    rate.numberOfStars = numberOfStars;

    //saving in the database
    rate.save()
        .then(result => {res.status(200).json(result)})
        .catch(error =>{ res.status(400).json(error)});

});

module.exports = router;