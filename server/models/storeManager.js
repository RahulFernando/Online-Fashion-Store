//modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueVaidator = require('mongoose-unique-validator');

// storeManager schema
const storeManagerSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

storeManagerSchema.plugin(uniqueVaidator);

const StoreManager = module.exports = mongoose.model('StoreManager', storeManagerSchema);

// find store manager by ID
module.exports.getStoreManagerByID = function (id, callback) {
    StoreManager.findById(id, callback);
};

// find store manager by its username
module.exports.getStoreManagerByUsername = function (username, callback) {
    const query = {
        username: username
    };
    StoreManager.findOne(query, callback);
};

// register store manager
module.exports.addStoreManager = function (newStoreManager, callback) {
    // password encryption
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStoreManager.password, salt, (err, hash) => {
            if (err) throw err;
            newStoreManager.password = hash;
            newStoreManager.save(callback);
        })
    })
};

// compare password
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}

// get all store managers
module.exports.getAllStoreManagers = function (callback) {
    StoreManager.find(callback)
}

// update strore manager
module.exports.updateStoreManagers = function (id, hash, storeManager, callback) {
    // check password same as previous if not hash password and update store manager
    bcrypt.compare(storeManager.password, hash, (err, isMatch) => {
        if (!isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(storeManager.password, salt, (err, hash) => {
                    if (err) throw err;
                    storeManager.password = hash;
                    StoreManager.findByIdAndUpdate(id, storeManager, callback)
                })
            })
        } else {
            StoreManager.findByIdAndUpdate(id, storeManager, callback)
        }
    })
}

// delete store managers
module.exports.deleteStoreManagers = function (id, callback) {
    StoreManager.findByIdAndDelete(id, callback)
}