require('dotenv').config()
const mongoose = require('mongoose')

// connexion to db
const dbConnetion = () => {
  const connectionString = process.env.CONNECTIONDB

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('***** CONNECTED TO DB *****')
    }).catch(err => {
      console.log('***** CONNETION ERROR *****')
      console.error(err)
    })
}

module.exports = { dbConnetion }
