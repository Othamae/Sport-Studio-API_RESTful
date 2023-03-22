const bcrypt = require('bcrypt')

/**
 * Password sin encriptar
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10)
  return hash
}
/**
 * Pasamos password sin encriptar y password encriptado para compararlos
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }
