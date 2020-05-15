 //modules
const mongoose = require('mongoose');
const uniqueVaidator = require('mongoose-unique-validator');

const SubCategory = require('./subCategory')

// main category schema
const MainCategorySchema = mongoose.Schema({
    mainCategoryName: {
        type: String,
        unique: true,
        required: true
    }
});

MainCategorySchema.plugin(uniqueVaidator);

const MainCategory = module.exports = mongoose.model('MainCategory', MainCategorySchema);

// find category by ID
module.exports.getMainCategoryByID = function (id, callback) {
    MainCategory.findById(id, callback);
};

// get all main categories
module.exports.getAllMainCategories = function (callback) {
    MainCategory.find(callback);
}

// create new main category
module.exports.addMainCategory = function (newMainCategory, callback) {
   newMainCategory.save(callback);
};

// update main category
module.exports.updateMainCategory = function (id,mainCategory, callback) {
    MainCategory.findByIdAndUpdate(id, mainCategory, callback);
}

// delete main category by id
module.exports.deleteMainCategory = function (id, callback) {
    MainCategory.findByIdAndDelete(id, callback)
}