
// const { Class } = require('../models/classes')

const getClasses = async (req, res) => {
  try {
    // const user = req.user
    // const data = await Class.findAllData({}) // ponemos await para esperar xq es una promesa
    res.send('GET ALL CLASSESS')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}

const addClass = async (req, res) => {
  try {
    res.send('add new class')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
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
