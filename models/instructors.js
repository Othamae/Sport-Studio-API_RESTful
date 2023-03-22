const mongoose = require('mongoose')
const { Schema } = mongoose

const instructorSchema = new Schema(
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
      required: true
    },
    classes: [{
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }
    ]

  },
  {
    timestamps: true,
    versionKey: false
  }
)

instructorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
    delete returnedObject._id

    delete returnedObject.password
  }
})

const Instructor = mongoose.model('Instructor', instructorSchema)

module.exports = Instructor
