
const Student = require('../models/students')
const { handleHttpError } = require('../middlewares/handleError')
const { encrypt } = require('../middlewares/handlePassword')

const getAllStudents = async (req, res) => {
  try {
    const data = await Student.find({})
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_STUDENTS')
  }
}

const addStudent = async (req, res) => {
  try {
    const { body } = req
    const { email, name, password, ageGroup } = body
    const hash = await encrypt(password)

    const student = new Student({
      name,
      email,
      password: hash,
      ageGroup
    })
    const newStudent = await Student.create(student)
    res.status(201).send({ newStudent })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_CREATING_STUDENT')
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

module.exports = { getAllStudents, addStudent, getStudent, updateStudent, deleteStudent }
