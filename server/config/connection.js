const mongoose = require('mongoose');

/* Remember if you are using Mongoose 6 or higher, you should just pass an empty object
after the url string instead of the four parameters. */

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ultimateTutorDB', {});

module.exports = mongoose.connection;
