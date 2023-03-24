
const { encrypt } = require('../middlewares/handlePassword')
const User = require('../models/users')

const checkUserRole = async (req, res, next) => {
  const { body } = req
  const { email, name, password, role } = body

  if (role === 'instructor' && !req.body.isAdmin) {
    return res.status(401).send('Unauthorized')
  }

  const user = new User({
    name,
    email,
    password: await encrypt(password),
    role
  })
  if (role === 'student') {
    user.ageGroup = body.ageGroup
    if (!user.ageGroup || user.ageGroup === '') {
      return res.status(400).send('ageGroup is required')
    }
  }
  if (role === 'instructor') {
    user.isAdmin = body.isAdmin
  }

  req.user = user

  next()
}
module.exports = { checkUserRole }
