const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = require('./app');


// db connect
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//     console.log(`Database Connect Successfully`)
// });
mongoose.connect(`mongodb+srv://Job-Portal:ujB5KCBCKrTJ3NQe@cluster0.bdcmpkm.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log(`Database Connect Successfully`.gray.bold)
});

// server port
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
  });