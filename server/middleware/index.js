// modules
const passport = require('passport');

const checkUserType = async (req, res, next) => {
    try {
        const userType = req.originalUrl.split('/')[2];
        require('../config/passport')(userType, passport);
        next();
    } catch (e) {

    }
};

module.exports = checkUserType;