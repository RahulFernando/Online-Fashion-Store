//modules
const express = require('express');
const router = express.Router();

const SubCategory = require('../models/subCategory'); // sub category schema

router.post('/newSubCategory', (req, res) => {
    let newSubCategory = SubCategory({
        subCategoryName: req.body.subCategoryName,
        main_category: req.body.main_category_id
    });
    SubCategory.addSubCategory(newSubCategory, (err, subCategory) => {
        if (err) {
            let message = "";
            if (err.errors.subCategoryName) message = "Category is already taken ";
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
    SubCategory.getAllSubCategories((err, subCategory) => {
        if (err) {
            return res.json({
                success: false,
                message
            });
        } else {
            return res.send(subCategory)
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

router.put('/subCategories/:id', (req, res) => {
    const subCategory = { 
        subCategoryName: req.body.subCategoryName,
        main_category: req.body.main_category_id
    }
    SubCategory.updateSubCategory(req.params.id, subCategory, (err) => {
        if (!err) {
            res.json({ message: 'Updated'})
        }
    })
})

router.delete('/subCategories/:id', (req, res) => {
    SubCategory.deleteSubCategory(req.params.id, (err) => {
        if (!err) {
            res.send({ message: req.params.id + ' deleted' })
        }
    })
})

module.exports = router;