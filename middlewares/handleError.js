
const handleHttpError = (res, message = 'Something happend', code = 403) => {
  res.status(code)
  res.send({ error: message })
}

module.exports = { handleHttpError }
