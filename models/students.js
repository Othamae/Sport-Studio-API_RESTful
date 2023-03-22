const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    classes: [{
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }
    ],
    ageGroup: {
      type: String,
      enum: ['adult', 'child'],
      default: 'adult'
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)

studentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject._id

    delete returnedObject.password
  }
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
