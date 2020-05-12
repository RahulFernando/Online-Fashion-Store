//modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Item} = require("../models/Item");
const User = require('../models/user')
const fs = require('fs')


//Save Images in the Server
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({storage: storage}).single("file")


//Upload Item Details
router.post('/uploadItem', async (req, res) => {
   try {
        await upload(req, res, err => {
            if (err) return res.json({success: false, err})
            const product = new Item()
            console.log(req.file.path)
            product.image.data = fs.readFileSync(req.file.path)
            product.image.contentType = "image/png"
            product.itemName = req.body.itemName
            product.mainCategory = req.body.mainCategory
            product.subCategory = req.body.subCategory
            product.size = req.body.size
            product.qty = req.body.qty
            product.description = req.body.description
            product.price = req.body.price

            product.save((err) => {
                if (err) return res.status(400).json({success: false, err})
                return res.status(200).json({success: true})
            })
    })
   } catch (error) {
       console.log(error)
   }
});


//Get Item Details
router.get('/getItem', async (req, res) => {
    try {
        await Item.find()
        .exec((err, products) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, products})
        })
    } catch (error) {
       console.log(error) 
    }
});


//Get Men Details
router.get('/getMen', async (req, res) => {
    try {
        const query = { "mainCategory": "Men" }

        await Item.find(query)
        .exec((err, men) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, men})
        })
    } catch (error) {
        console.log(error)
    }
});


//Get Women Details
router.get('/getWomen', async (req, res) => {
    try {
        const query = { "mainCategory": "Women" }

        await Item.find(query)
        .exec((err, women) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, women})
        })
    } catch (error) {
        console.log(error)
    }
});


//Get Kids Details
router.get('/getKids', async (req, res) => {
    try {
        const query = { "mainCategory": "Kid" }

        await Item.find(query)
        .exec((err, kids) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, kids})
        })
    } catch (error) {
        console.log(error)
    }
});


//Edit Item Details
router.route('/editItem/:id').get( async (req,res) => {
   try {
        await Item.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : '  +err));
   } catch (error) {
       console.log(error)
   }
});


//Update Item Details
router.route('/updateItem/:id').put(async (req, res) => {
    try {
        await Item.findById(req.params.id, function(error, item){
            if(!item)
            res.status(404).send("data is not found");
            else {
            item.itemName = req.body.itemName,
            item.mainCategory = req.body.mainCategory,
            item.subCategory = req.body.subCategory,
            item.size = req.body.size,
            item.qty = req.body.qty,
            item.description = req.body.description,
            item.price = req.body.price,
            item.discount = req.body.discount,
            item.save().then(item => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            })
            }
        })
    } catch (error) {
        console.log(error)
    }
})


//Delete Item Details
router.route('/deleteItem/:id').get(async (req,res) => {
    try {
        await  User.find({
            Cart: {
                $elemMatch: {id: req.params.id}
            }
        }, function(err, match) {
            if (match) {
                return res.json({
                    status: 403,
                    message: "This item in cart"
                })
            } else if(!match) {
                User.find({
                    WishList: {
                        $elemMatch: {id: req.params.id}
                    }
                }, function(err, match){
                    if(match) {
                        return res.json({
                            status: 403,
                            message: "This item in whishlist"
                        })
                    }
                })
            } else {
                Item.findByIdAndRemove({_id: req.params.id}, function(err, item) {
                    if (err) {
                        res.json(err)
                    } else {
                        res.json('Successfully removed')
                    }
                })
            }
        })  
    } catch (error) {
        console.log(error)   
    }
})


router.route('/getItem/:id').get(async (req,res) => {
   try {
        await Item.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : '  +err));
   } catch (error) {
       console.log(error)
   }
});

router.route('/decrement/:id').post((req,res) => {
   
    Item.findOneAndUpdate(
        { _id: req.params.id},
        { $inc: { "qty": -1 } },
        { new: true },
        () => {
            res.status(200).json({success: true})
        }
    )


});


router.route('/increment/:id').post((req,res) => {
   
    Item.findOneAndUpdate(
        { _id: req.params.id},
        { $inc: { "qty": req.body.qty } },
        { new: true },
        () => {
            res.status(200).json({success: true})
        }
    )


});





module.exports = router;