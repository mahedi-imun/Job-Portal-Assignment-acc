const mongoose = require('mongoose');
function dbConnect(){
  mongoose.connect('mongodb+srv://Job-Portal:ujB5KCBCKrTJ3NQe@cluster0.bdcmpkm.mongodb.net/?retryWrites=true&w=majority');
}

module.exports = dbConnect;