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
        url: 'https://www.linkedin.com/in/veronica-conesa-gomez/',
        email: 'vero.gconesa@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Classes',
        description: 'Everything about the classes'
      },
      {
        name: 'Instructors',
        description: 'Everything about the instructors'
      },
      {
        name: 'Students',
        description: 'Everything about the students'
      }
    ],
    components: {
      schemas: {
        Class: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            duration: {
              type: 'object',
              properties: {
                lections: { type: 'number' },
                start: { type: 'string', format: 'date', pattern: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$' },
                end: { type: 'string', format: 'date', pattern: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$' }
              }
            },
            time: { type: 'string', format: 'time', pattern: '^([0-1][0-9]|[2][0-3]):([0-5][0-9])$' },
            instructor: { type: 'string' },
            level: {
              type: 'object',
              properties: {
                student: { type: 'string', enum: ['adult', 'child'] }
              }
            },
            capacity: { type: 'number' }
          }
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string', enum: ['student', 'teacher'], default: 'student' },
            ageGroup: { type: 'string', enum: ['adult', 'child'], default: 'adult' }
          },
          required: ['name', 'email', 'password'],
          example: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'student',
            ageGroup: 'adult'
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app
