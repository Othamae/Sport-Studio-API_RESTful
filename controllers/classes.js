
const Class = require('../models/classes.js')
// const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

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
    console.log(body)
    const data = await Class.create(body)
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_CREATING_CLASS')
  }
}

const getClass = async (req, res) => {
  try {
    res.send('get class by id')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const updateClass = async (req, res) => {
  try {
    res.send('update class')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const deleteClass = async (req, res) => {
  try {
    res.send('delete class')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
module.exports = { getClasses, addClass, getClass, updateClass, deleteClass }
