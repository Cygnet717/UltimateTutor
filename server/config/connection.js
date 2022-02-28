const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ultimateTutorDB', {});

module.exports = mongoose.connection;
