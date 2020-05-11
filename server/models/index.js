//modules
const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.Promise = global.Promise // asynchronize handling
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('db connected...')
    } else {
        console.log('Error in MongoDB connection: ' + JSON.stringify(err,undefined,2))
    }
});



