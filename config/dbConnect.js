const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sales-system', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Ket noi thanh cong voi moongose")
});


module.exports = mongoose

