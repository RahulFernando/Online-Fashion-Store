//modules
const express = require('express');
const router = express.Router();

const SubCategory = require('../models/subCategory'); // sub category schema

router.post('/newSubCategory', (req, res) => {
    let newSubCategory = SubCategory({
        name: req.body.name,
        main_category: req.body.main_category
    });
    SubCategory.addSubCategory(newSubCategory, (err, subCategory) => {
        if (err) {
            let message = "";
            if (err.errors.name) message = "Category is already taken ";
            return res.json({
                success: false,
                message
            })
        } else {
            return res.json({
                status: 200,
                message: 'New Sub category created'
            })
        }
    })
});

router.get('/subCategories', (req, res) => {
    SubCategory.getAllMainCategories((err, subCategory) => {
        if (err) {
            return res.json({
                success: false,
                message
            });
        } else {
            return res.send(SubCategory)
        }
    })
});

router.get('/subCategories/:id', (req, res) => {
    SubCategory.getSubcategoryByID(req.params.id, (err, subCategory) => {
        if (err) {
            let message = "";
            if (err.errors.id) {
                message = "No such category";
            }
            return res.json({
                success: false,
                message
            });
        } else {
            return res.send(subCategory)
        }
    })
});

module.exports = router;