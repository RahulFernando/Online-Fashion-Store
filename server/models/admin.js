//modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueVaidator = require('mongoose-unique-validator');

//user schema
const AdminSchema = mongoose.Schema({
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

AdminSchema.plugin(uniqueVaidator);

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

// find admin by ID
module.exports.getAdminByID = function (id, callback) {
    Admin.findById(id, callback);
};

// find admin by its username
module.exports.getAdminByUsername = function (username, callback) {
    const query = {
        username: username
    };
    Admin.findOne(query, callback);
};

// register admin
module.exports.addAdmin = function (newAdmin, callback) {
    // password encryption
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save(callback);
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