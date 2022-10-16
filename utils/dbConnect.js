const mongoose = require('mongoose');
function dbConnect(){
  
    mongoose.connect(`mongodb+srv://tourAdmin:RIucOBwpcqnZASdR@cluster0.orvnefn.mongodb.net/?retryWrites=true&w=majority`)
    .then()
    .catch((error) => {
      console.log(error)
    })
}

module.exports = dbConnect;