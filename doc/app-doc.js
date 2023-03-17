const express = require('express')
const app = express()

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Poledance Studio API',
      version: '1.0.0',
      description: 'Documentation of Poledance Studio API',
      contact: {
        name: 'Veronica Conesa',
        url: 'https://www.linkedin.com/in/veronica-conesa-gomez/'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app
