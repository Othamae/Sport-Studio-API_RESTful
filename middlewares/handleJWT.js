
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Se pasa el objeto del usuario (name, password...)
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }
  )
  return sign
}
/**
 * Hay que pasar el token se sesion JWT
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (e) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }
