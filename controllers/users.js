const { compare } = require('../middlewares/handlePassword')
const Instructor = require('../models/instructors')
const { handleHttpError } = require('../middlewares/handleError')
const { tokenSign } = require('../middlewares/handleJWT')

const userLogin = async (req, res) => {
  try {
    const { body } = req

    const { email, password } = body
    const user = await Instructor.findOne({ email })

    const passwordCorrect = user === null
      ? false
      : await compare(password, user.password)
    if (!(user && passwordCorrect)) {
      handleHttpError(res, 'INCORRECT_USER_OR_PASSWORD', 401)
    }

    const data = {
      user: user.name,
      email: user.email,
      token: await tokenSign(user)
    }

    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_LOGIN_USER')
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
