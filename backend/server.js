require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Create app
const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// app route
app.use('/api/workouts', workoutRoutes)

// Connnect to the mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for the request
    app.listen(process.env.PORT, () => {
        console.log('connected to mongodb and listening at port ', process.env.PORT)
    });
  })
  .catch((error) => {
    console.log(error)
  })
