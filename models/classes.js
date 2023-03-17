const mongoose = require('mongoose')
const { Schema } = mongoose

const ClassScheme = new Schema({
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
    type: String
  },
  capacity: {
    type: Number
  }
})

module.exports = mongoose.model('classes', ClassScheme)
