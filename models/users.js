const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete')
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

// userSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

const User = mongoose.model('User', userSchema)

module.exports = User
