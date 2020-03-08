//modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueVaidator = require('mongoose-unique-validator');

//user schema
const UserSchema = mongoose.Schema({
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

UserSchema.plugin(uniqueVaidator);

const User = module.exports = mongoose.model('User', UserSchema);

// find admin by ID
module.exports.getUserByID = function (id, callback) {
    User.findById(id, callback);
};

// find admin by its username
module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
};

// register admin
module.exports.addUser = function (newUser, callback) {
    // password encryption
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
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