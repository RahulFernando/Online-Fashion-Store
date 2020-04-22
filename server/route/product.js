//modules
const express = require('express');
const router = express.Router();
const multer = require('multer');


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

// router.get('/', (req, res) => {
//     res.send("Hello")
// })

router.post('/uploadImage', (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({success: false, err})
        console.log(req.body.description)
    })
});


module.exports = router;