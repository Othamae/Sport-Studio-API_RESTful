
const handleHttpError = (res, message = 'Something happend', code = 403) => {
  res.status(code)
  res.json({ error: message })
}

module.exports = { handleHttpError }
