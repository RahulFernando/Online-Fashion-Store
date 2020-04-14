// modules
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// models
const Admin = require('../models/admin');
const User = require('../models/user');
const StoreManager = require('../models/storeManager');

// authenticate user by JWTStrategy
module.exports = (userType, passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
    opts.secretOrKey = process.env.SECRET;
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        if (userType == 'admin') {
            Admin.getAdminByID(jwt_payload.data._id, (err, admin) => {
                if (err) return done(err, false);
                if (admin) return done(null, admin);
                return done(null, false);
            })
        }
        if (userType == 'users') {
            User.getUserByID(jwt_payload.data._id, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
            })
        }
        if (userType == 'storeManager') {
            StoreManager.getStoreManagerByID(jwt_payload.data._id, (err, storeManager) => {
                if (err) return done(err, false);
                if (user) return done(null, storeManager);
                return done(null, false);
            })
        }
    }));
};