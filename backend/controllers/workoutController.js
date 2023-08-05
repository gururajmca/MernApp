const Workout = require('../models/workoutModel')

const mongoose = require('mongoose')
// Create new workout
const createNewWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    try {
      const workout = await Workout.create({title, load, reps})
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// Get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})
  console.log('hello ', workouts)
  res.status(200).json(workouts)
}

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout'})
  }
  const workout = await Workout.findById(id)

  if(!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// Delete the workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  // check the id is available before deleting this from the DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }
  const workout = await Workout.findOneAndDelete({_id: id})
  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// Update the workout
const updateWorkout = async(req, res) => {
  const { id } = req.params;
  // check the id is available before deleting this from the DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }
  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  // console.log(workout)
  res.status(200).json(workout)
}

// export the modules
module.exports = {
  createNewWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}
