const mongoose = require('mongoose');

/* Remember if you are using Mongoose 6 or higher, you should just pass an empty object
after the url string instead of the four parameters. */

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernauth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
