
const Student = require('../models/students')
const User = require('../models/users')
const { handleHttpError } = require('../middlewares/handleError')

const getAllStudents = async (req, res) => {
  try {
    const data = await User.find({ role: 'student' })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_STUDENTS')
  }
}

const getStudent = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Student.findById(id)
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_STUDENT_BY_ID')
  }
}

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await Student.findByIdAndUpdate(id, body, { new: true })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_UPDATING_STUDENT')
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Student.deleteOne({ _id: id })
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_DELETING_STUDENT')
  }
}

module.exports = { getAllStudents, getStudent, updateStudent, deleteStudent }
