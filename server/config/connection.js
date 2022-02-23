const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ultimateTutorDB', {});

module.exports = mongoose.connection;
