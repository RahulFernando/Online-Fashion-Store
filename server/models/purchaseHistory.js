const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const purchaseHistorySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    date: {
        type : Date, 
       },

     purchasedItems : {
            type: Array,
            default: []
        },
    
}, {timestamps: true})


const History = mongoose.model('History', purchaseHistorySchema);

module.exports = {History}