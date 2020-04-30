//modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

const MainCategory = require('../models/mainCategory'); //main category schema


router.post('/mainCategory', passport.authenticate('jwt', { session: false }), (req, res) => {
    let newMainCategory = MainCategory({
        mainCategoryName: req.body.mainCategoryName,
    });
    MainCategory.addMainCategory(newMainCategory, (err) => {
        if (err) {
            let message = "";
            if (err.errors.mainCategoryName) message = "Category is already taken ";
            return res.json({
                success: false,
                message
        })
        } else {
            return res.json({
                status: 200,
                message: 'New Main category created'
            })
        }
    })
});

router.get('/mainCategories',(req, res) => {
        MainCategory.getAllMainCategories((err, mainCategory) => {
            if (err) {
                return res.json({
                    success: false
                });
            } else {
                return res.send(mainCategory)
            }
        })

});

router.get('/mainCategories/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    MainCategory.getMainCategoryByID(req.params.id, (err, mainCategory) => {
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
            return res.send(mainCategory)
        }
    })
});

router.put('/mainCategories/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const mainCategory = { mainCategoryName: req.body.mainCategoryName}
    MainCategory.updateMainCategory(req.params.id, mainCategory, (err) => {
        if (!err) {
            res.json({ message: 'Updated'})
        }
    })
})

router.delete('/mainCategories/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    MainCategory.deleteMainCategory(req.params.id, (err) => {
        if (!err) {
            res.send({ message: req.params.id + ' deleted' })
        }
    })
})

module.exports = router;