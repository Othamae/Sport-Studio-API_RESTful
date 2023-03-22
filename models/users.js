const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
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
    role: {
      type: String,
      enum: ['student', 'teacher'],
      default: 'student'
    },
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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject._id

    delete returnedObject.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
