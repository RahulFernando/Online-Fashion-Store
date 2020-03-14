//modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

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

//port
const port = process.env.PORT;

const admin = require('./route/admin');
const user = require('./route/user');

//admin routes
app.use('/api/admin', admin);
app.use('/api/users', user);

//listening to port
app.listen(port, () => console.log(`Server is running: ${port}`));

