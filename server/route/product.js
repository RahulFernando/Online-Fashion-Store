//modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Item} = require("../models/Item");
const fs = require('fs')


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



router.post('/uploadItem', (req, res) => {
    upload(req, res, err => {
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
});

router.get('/getItem', (req, res) => {
    Item.find()
    .exec((err, products) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, products})
    })
});

// router.get('/getImage', (req, res) => {
//     Item.find()
//     .exec((err, images) => {
//         if (err) return res.status(400).json({success: false, err})
//         res.status(200).json({success: true, images})
//     })
// });

router.get('/getMen', (req, res) => {

    const query = { "mainCategory": "Men" }

    Item.find(query)
    .exec((err, men) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, men})
    })
});


router.get('/getWomen', (req, res) => {

    const query = { "mainCategory": "Women" }

    Item.find(query)
    .exec((err, women) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, women})
    })
});


router.get('/getKids', (req, res) => {

    const query = { "mainCategory": "Kid" }

    Item.find(query)
    .exec((err, kids) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, kids})
    })
});

router.route('/editItem/:id').get((req,res) => {
   
    Item.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : '  +err));
});


router.route('/updateItem/:id').put((req, res) => {
  console.log(req.body)
    Item.findById(req.params.id, function(error, item){
        if(!item)
        res.status(404).send("data is not found");
        else {
        // item.image = req.file.path,
        item.itemName = req.body.itemName,
        item.mainCategory = req.body.mainCategory,
        item.subCategory = req.body.subCategory,
        item.size = req.body.size,
        item.qty = req.body.qty,
        item.description = req.body.description,
        item.price = req.body.price

        item.save().then(item => {
            res.json('Update complete');
        })
        .catch(err => {
            res.status(400).send("unable to update the database");
        })
        }
    })
})

router.route('/deleteItem/:id').get((req,res) => {
    Item.findByIdAndRemove({_id: req.params.id}, function(err, item) {
        if (err) {
            res.json(err)
        } else {
            res.json('Successfully removed')
        }
    })
})


router.route('/getItem/:id').get((req,res) => {
   
    Item.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : '  +err));
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