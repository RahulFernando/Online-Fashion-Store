const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

const itemSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    itemName: {
        type: String,
    },
    mainCategory: {
        type: String,
        maxlength: 50
    },
    subCategory: {
        type: String,
        maxlength: 50
    },
    size: {
        type: String,
    },
    qty: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


const Item = mongoose.model('Item', itemSchema);

module.exports = { Item }
