const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kjb717:newDb7!7@clusterkb.vc8qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ultimateTutorDB', {});

module.exports = mongoose.connection;
