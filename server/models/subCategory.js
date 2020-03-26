//modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueVaidator = require('mongoose-unique-validator');

// main category schema
const SubCategorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    main_category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory'
    }
});

SubCategorySchema.plugin(uniqueVaidator);

const SubCategory = module.exports = mongoose.model('SubCategory', SubCategorySchema);

// find category by ID
module.exports.getSubcategoryByID = function (id, callback) {
    SubCategory.findById(id, callback);
};

// create new sub category
module.exports.addSubCategory = function (newSubCategory, callback) {
    newSubCategory.save(callback);
};