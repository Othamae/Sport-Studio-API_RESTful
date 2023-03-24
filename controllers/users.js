const { compare } = require('../middlewares/handlePassword')
// const Instructor = require('../models/instructors')
const User = require('../models/users')
const { handleHttpError } = require('../middlewares/handleError')
const { tokenSign } = require('../middlewares/handleJWT')

const userLogin = async (req, res) => {
  try {
    const { body } = req

    const { email, password } = body
    const user = await User.findOne({ email })

    const passwordCorrect = user === null
      ? false
      : await compare(password, user.password)
    if (!(user && passwordCorrect)) {
      handleHttpError(res, 'INCORRECT_USER_OR_PASSWORD', 401)
      return
    }
    const data = {
      user: user.name,
      email: user.email
    }

    if (user.role === 'instructor') {
      data.token = await tokenSign(user)
    }
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_LOGIN_USER')
  }
}

const userRegister = async (req, res) => {
  try {
    const newUser = req.user
    const email = newUser.email
    const checkingEmail = await User.findOne({ email })
    if (checkingEmail) {
      return res.status(403).json({ error: 'EMAIL_ALREADY_EXIST' })
    }
    const userCreated = await (await User.create(newUser))
    res.status(201).send({ userCreated })
  } catch (e) {
    console.log(e)
    handleHttpError(res, `ERROR_CREATING_${req.user.role}`)
  }
}

module.exports = { userLogin, userRegister }
