const getAllInstructors = async (req, res) => {
  try {
    // const user = req.user
    // const data = await Class.findAllData({}) // ponemos await para esperar xq es una promesa
    res.send('GET ALL INSTRUCTORS')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}

const addInstructor = async (req, res) => {
  try {
    res.send('add new instructor')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const getInstructor = async (req, res) => {
  try {
    res.send('get instructor by id')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const updateInstructor = async (req, res) => {
  try {
    res.send('update instructor')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const deleteInstructor = async (req, res) => {
  try {
    res.send('delete instructor')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
module.exports = { getAllInstructors, addInstructor, getInstructor, updateInstructor, deleteInstructor }
