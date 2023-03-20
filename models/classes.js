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
        type: String,
        validate: {
          validator: function (v) {
            return /^\d{2}\/\d{2}\/\d{4}$/.test(v) // Validar formato dd/mm/aaaa
          },
          message: props => `${props.value} is not a valid date format! (DD/MM/YYYY)`
        }
      },
      end: {
        type: String,
        validate: {
          validator: function (v) {
            return /^\d{2}\/\d{2}\/\d{4}$/.test(v) // Validar formato dd/mm/aaaa
          },
          message: props => `${props.value} is not a valid date format! (DD/MM/YYYY)`
        }
      }
    },
    time: {
      type: String,
      match: /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/
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

module.exports = mongoose.model('Class', classScheme)
