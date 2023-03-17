const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnetion } = require('./mongo.js')
const classesRouter = require('./routes/classes.js')
const apiDoc = require('./doc/app-doc.js')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.use('/api', classesRouter)
app.use('/api-docs', apiDoc)

app.get('/api', (req, res) => {
  res.send('Hello Wordl!')
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
dbConnetion()
