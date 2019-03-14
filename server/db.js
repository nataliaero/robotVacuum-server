const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoUrl, {useNewUrlParser: true});

module.exports = mongoose;