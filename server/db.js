const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/robotVacuumDb', {useNewUrlParser: true});

module.exports = mongoose;