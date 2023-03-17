const mongoose = require('mongoose')
const { Schema } = mongoose

const classScheme = new Schema(
  {
    name: {
      type: String
    },
    duration: {
      lections: {
        type: Number
      },
      start: {
        type: Date
      },
      end: {
        type: Date
      }
    },
    time: {
      type: Date
    },
    instructor: {
      type: String
    },
    level: {
      type: String,
      student: ['adult', 'child']
    },
    capacity: {
      type: Number
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Class = mongoose.model('Class', classScheme)
module.exports = Class
