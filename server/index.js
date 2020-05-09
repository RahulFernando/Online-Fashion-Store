//modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//database
const db = require('./models');

//initialize the app
const app = express();

const checkUserType = require('./middleware'); // custom middleware

//define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(checkUserType);
app.use(express.json())
//port
const port = process.env.PORT;

const admin = require('./route/admin');
const user = require('./route/user');
const mainCategory = require('./route/mainCategory');
const subCategory = require('./route/subCategory');
const storeManager = require('./route/storeManager');
const product = require('./route/product');
const wishlist = require('./route/wishList');
const cart = require('./route/cart');
const payment = require('./route/payment');
const reciept = require('./route/reciept');
const rating = require('./route/rating');

// routes
app.use('/api/admin', admin);
app.use('/api/users', user);
app.use('/api/admin/mainCategory', mainCategory);
app.use('/api/admin/subCategory', subCategory);
app.use('/api/admin/storeManager', storeManager);
app.use('/api/product', product);
app.use('/api/users/wishList',wishlist);
app.use('/api/users/cart',cart);
app.use('/api/users/payment',payment);
app.use('/api/users/reciept',reciept);
app.use('/api/users/rating',rating);




//listening to port
app.listen(port, () => console.log(`Server is running: ${port}`));

