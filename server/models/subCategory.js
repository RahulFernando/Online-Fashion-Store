//modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueVaidator = require('mongoose-unique-validator');

// main category schema
const SubCategorySchema = mongoose.Schema({
    subCategoryName: {
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

// get all sub categories
module.exports.getAllSubCategories = function (callback) {
    SubCategory.find(callback)
}

// create new sub category
module.exports.addSubCategory = function (newSubCategory, callback) {
    newSubCategory.save(callback);
};

// update main category
module.exports.updateSubCategory = function (id,mainCategory, callback) {
    SubCategory.findByIdAndUpdate(id, mainCategory, callback);
}

// delete main category by id
module.exports.deleteSubCategory = function (id, callback) {
    SubCategory.findByIdAndDelete(id, callback);
}