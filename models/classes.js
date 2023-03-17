const mongoose = require('mongoose')
const { Schema } = mongoose

const ClassScheme = new Schema({
  name: String,
  duration: Number,
  startingDay: Date,
  finishDay: Date,
  time: Date,
  instructor: String,
  level: String,
  capacity: Number
})
