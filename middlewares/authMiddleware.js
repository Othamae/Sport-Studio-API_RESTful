const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const { handleHttpError } = require('./handleError')

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    let token = ''
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }
    await jwt.verify(token, JWT_SECRET)
    next()
  } catch (e) {
    handleHttpError(res, 'TOKEN_MISSING_OR_INVALID', 401)
  }
}

module.exports = { authMiddleware }
