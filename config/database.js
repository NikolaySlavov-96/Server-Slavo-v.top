const mongoose = require('mongoose');

const REQUEST_STRING = 'mongodb://192.168.88.50/uploadPath';

module.exports = async (app) => {
    try {
        await mongoose.connect(REQUEST_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Success connect DB')
    } catch(err) {
        console.error(err.message);
    }
}