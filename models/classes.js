const mongoose = require('mongoose')
const { Schema } = mongoose

const classScheme = new Schema(
  {
    name: {
      type: String
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
    },
    time: {
      type: String,
      match: /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/
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
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)

classScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Class', classScheme)
