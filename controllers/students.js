const getAllStudents = async (req, res) => {
  try {
    // const user = req.user
    // const data = await Class.findAllData({}) // ponemos await para esperar xq es una promesa
    res.send('GET ALL STUDENTS')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}

const addStudent = async (req, res) => {
  try {
    res.send('add new student')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const getStudent = async (req, res) => {
  try {
    res.send('get student by id')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const updateStudent = async (req, res) => {
  try {
    res.send('update student')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
const deleteStudent = async (req, res) => {
  try {
    res.send('delete student')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}
module.exports = { getAllStudents, addStudent, getStudent, updateStudent, deleteStudent }
