const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnetion } = require('./mongo.js')
const classesRouter = require('./routes/classes.js')
const instructorsRouter = require('./routes/instructors')
const studentsRouter = require('./routes/students')
const userRouter = require('./routes/users')
const apiDoc = require('./doc/app-doc.js')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.use('/api', classesRouter)
app.use('/api', instructorsRouter)
app.use('/api', studentsRouter)
app.use('/api', userRouter)
app.use('/api/doc', apiDoc)

app.get('/api', (req, res) => {
  res.send('Hello Wordl!')
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
dbConnetion()
