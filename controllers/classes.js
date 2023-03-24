
const Class = require('../models/classes.js')
const User = require('../models/users')
const { handleHttpError } = require('../middlewares/handleError')

const getClasses = async (req, res) => {
  try {
    const data = await Class.find({}).populate('instructor', { name: 1, email: 1, _id: 0 })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_CLASSES')
  }
}

const addClass = async (req, res) => {
  try {
    const body = req.body
    const instructorId = body.instructor
    const instructor = await User.findById(instructorId)
    const newClass = new Class({ ...body, instructor: instructor._id })

    const data = await Class.create(newClass)
    const classCreated = await Class.findById(data._id).populate('instructor', { name: 1, email: 1, _id: 0 })
    instructor.classes = instructor.classes.concat(data._id)
    await instructor.save()

    res.status(201).send({ classCreated })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_CREATING_CLASS')
  }
}

const getClass = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Class.findById(id).populate('instructor', { name: 1, email: 1, _id: 0 })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_CLASS_BY_ID')
  }
}

const updateClass = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body
    const data = await Class.findByIdAndUpdate(id, body, { new: true }).populate('instructor', { name: 1, email: 1, _id: 0 })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_UPDATING_CLASS')
  }
}

const deleteClass = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Class.deleteOne({ _id: id })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_DELETING_CLASS')
  }
}
module.exports = { getClasses, addClass, getClass, updateClass, deleteClass }
