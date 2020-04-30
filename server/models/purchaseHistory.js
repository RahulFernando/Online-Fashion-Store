const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    date: {type : Date, 
        required : true},

     purchasedItems : {
            type: Array,
            default: []
        },
    
}, {timestamps: true})


const History = mongoose.model('History', itemSchema);

module.exports = {History}