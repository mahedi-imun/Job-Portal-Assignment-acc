const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(cors());

// routes
const jobRoute = require('./routes/jobs.route');
const managerRoute = require('./routes/hiringManager.route');
const candidateRoute = require('./routes/candidate.route');
const adminRoute = require('./routes/admin.route')
const userRoute = require('./routes/user.route')

// route calling
app.use('/', jobRoute)
app.use('/', managerRoute)
app.use('/', candidateRoute)
app.use('/', adminRoute)
app.use('/', userRoute)



app.get("/", (req, res) => {
    res.send("Route Is Working")
})


module.exports = app;