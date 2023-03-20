const userLogin = async (req, res) => {
  try {
    // const user = req.user
    // const data = await Class.findAllData({}) // ponemos await para esperar xq es una promesa
    res.send('USER LOGIN')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}

const userRegister = async (req, res) => {
  try {
    res.send('USER REGISTER')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}

const userLogout = async (req, res) => {
  try {
    // const user = req.user
    // const data = await Class.findAllData({}) // ponemos await para esperar xq es una promesa
    res.send('USER LOGOUT')
  } catch (e) {
    console.log('ESTE ES EL ERROR')
    console.log(e)
  }
}

module.exports = { userLogin, userRegister, userLogout }
