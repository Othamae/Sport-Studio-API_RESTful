
const Class = require('../models/classes.js')
const { handleHttpError } = require('../middlewares/handleError')

const getClasses = async (req, res) => {
  try {
    const data = await Class.find({})
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_GETTING_CLASSES')
  }
}

const addClass = async (req, res) => {
  try {
    const body = req.body
    const data = await Class.create(body)
    res.status(201).send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_CREATING_CLASS')
  }
}

const getClass = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Class.findById(id)
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
    const data = await Class.findByIdAndUpdate(id, body, { new: true })
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
