const mongoose = require('mongoose');
function dbConnect(){
  try {
    
    mongoose.connect(`mongodb+srv://Job-Portal:ujB5KCBCKrTJ3NQe@cluster0.bdcmpkm.mongodb.net/?retryWrites=true&w=majority`)
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = dbConnect;