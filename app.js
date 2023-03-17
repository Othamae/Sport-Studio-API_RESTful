const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnetion } = require('./mongo.js')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Hello Wordl!')
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
dbConnetion()
