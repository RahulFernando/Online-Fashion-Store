const express = require('express');
const router = express.Router();
const rateModel = require('../models/rating');


router.get('/', (req, res) => {
    //getting all the ratings
    rateModel.find()
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
    var userId = req.query.userId;
    var productId = req.query.productId;
    var comment = req.query.comment;
    var numberOfStars = req.query.numberOfStars;

    var rate = new rateModel();
    rate.userId = userId;
    rate.productId = productId;
    rate.comment = comment;
    rate.numberOfStars = numberOfStars;

    //saving in the database
    rate.save()
        .then(result => {res.status(200).json(result)})
        .catch(error =>{ res.status(400).json(error)});

});

router.patch('/',(req,res) => {

    //gathering all the required parameters to update a rating
    var ratingId = req.query.ratingId;
    var comment = req.query.comment;
    var numberOfStars = req.query.numberOfStars;

    //update the sensor with the specified rating id in the HTTP request
    rateModel.updateOne({_id : ratingId},{comment : comment,numberOfStars : numberOfStars})
        .then(result => {res.status(200).json(result)})
        .error(error => {res.status(400).json(error)});
});
router.delete('/',(req,res) => {

    //gathering all the required parameters to delete a rating
    var ratingId = req.query.ratingId;

    //delete the rating with the specified ratingId in the HTTP request
    rateModel.deleteOne({_id : ratingId})
        .then(result => {res.status(200).json(result)})
        .error(error => {res.status(400).json(error)});
});

router.get('/find',(req,res) => {

    //gathering all the required parameters to find for a rating
    var userId = req.query.userId;
    var productId = req.query.productId;


    rateModel.find({userId : userId, productId : productId})
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