const Instructor = require('../models/instructors')
const User = require('../models/users')

const { handleHttpError } = require('../middlewares/handleError')

const getAllInstructors = async (req, res) => {
  try {
    const data = await User.find({ role: 'instructor' }).populate('classes', { instructor: 0 })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_INSTRUCTORS')
  }
}

const getInstructor = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Instructor.findById(id).populate('classes', { instructor: 0 })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_INSTRUCTOR_BY_ID')
  }
}

const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await Instructor.findByIdAndUpdate(id, body, { new: true })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_UPDATING_INSTRUCTOR')
  }
}

const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Instructor.deleteOne({ _id: id })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_DELETING_INSTRUCTOR')
  }
}

module.exports = { getAllInstructors, getInstructor, updateInstructor, deleteInstructor }
