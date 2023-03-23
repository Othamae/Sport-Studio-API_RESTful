const { authMiddleware } = require('./authMiddleware')
const { encrypt } = require('../middlewares/handlePassword')
const User = require('../models/users')

const checkRole = (req, res, next) => {
  if (req.body.role === 'instructor') {
    // Verificar que el usuario tenga permisos de administrador
    if (!req.body.isAdmin) {
      return res.status(401).send('Unauthorized')
    }
    authMiddleware(req, res, () => {
      next()
    })
  } else if (req.body.role === 'student') {
    if (!req.body.ageGroup) {
      return res.status(400).send('ageGroup is required')
    }
    next()
  } else {
    return res.status(400).send('Invalid role')
  }
}

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
  }
  if (role === 'instructor') {
    user.isAdmin = body.isAdmin
  }

  req.user = user

  next()
}
module.exports = { checkRole, checkUserRole }
