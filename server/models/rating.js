const mongoose = require('mongoose');

const schema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userId : {type:String,required:true},
    productId :  {type:String,required:true},
    comment :  {type:String,required:true},
    numberOfStars :  {type:Number,required:true}

});

module.exports = mongoose.model('Rating', schema);