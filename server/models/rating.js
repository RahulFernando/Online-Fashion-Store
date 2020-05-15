const mongoose = require('mongoose');

const schema = mongoose.Schema({

    userName: {type:String},
    userId : {type:String,required:true},
    productId :  {type:String,required:true},
    comment :  {type:String,required:true},
    numberOfStars :  {type:Number,required:true}

});

module.exports = mongoose.model('Rating', schema);