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

//define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//port
const port = process.env.PORT;

//admin route
const admin = require('./route/admin');
app.use('/api/admin', admin);

//listening to port
app.listen(port, () => console.log(`Server is running: ${port}`));

