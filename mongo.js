require('dotenv').config()
const mongoose = require('mongoose')

const { CONNECTIONDB, MONGO_DB_URI_TEST, NODE_ENV } = process.env

// connexion to db
const dbConnetion = () => {
  const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : CONNECTIONDB

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

// process.on('uncaughtException', () => {
//   mongoose.disconnect()
// })

module.exports = { dbConnetion }
