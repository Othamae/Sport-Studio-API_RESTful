const Instructor = require('../models/instructors')
const { handleHttpError } = require('../middlewares/handleError')
const { encrypt } = require('../middlewares/handlePassword')

const getAllInstructors = async (req, res) => {
  try {
    const data = await Instructor.find({})
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_INSTRUCTORS')
  }
}

const addInstructor = async (req, res) => {
  try {
    const { body } = req
    const { email, name, password } = body
    const hash = await encrypt(password)

    const instructor = new Instructor({
      name,
      email,
      password: hash
    })
    const newInstructor = await Instructor.create(instructor)
    res.send({ newInstructor })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_CREATING_INSTRUCTOR')
  }
}

const getInstructor = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Instructor.findById(id)
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

module.exports = { getAllInstructors, addInstructor, getInstructor, updateInstructor, deleteInstructor }
