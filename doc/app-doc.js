const express = require('express')
const app = express()

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sport Studio API',
      version: '1.0.0',
      description:
      'The Sport Studio API is a RESTful application that provides endpoints for managing classes, instructors, and students.\n\n This documentation describes the API and how to use it to perform operations within the application. \n\nThe API is based on OpenAPI version 3.0.0 and can be accessed through different servers, depending on the development stage of the application. The endpoints are organized into three categories: classes, instructors, and students.\n\n The main data objects are classes and users, and they are described in the schema component. Each object has a set of properties that are described in detail, such as the identifier, name, email, and password for users, and the name, time, capacity, and duration for classes. There are also format restrictions for properties such as time and date. \n\nThis documentation details the ways to access each endpoint, the parameters that must be sent, and the results that can be expected.',
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
            time: { type: 'string', format: 'time', pattern: '^([0-1][0-9]|[2][0-3]):([0-5][0-9])$' },
            instructor: { type: 'string' },
            level: {
              type: 'object',
              properties: {
                student: { type: 'string', enum: ['adult', 'child'] }
              }
            },
            capacity: { type: 'number' },
            duration: {
              type: 'object',
              properties: {
                lections: { type: 'number' },
                start: { type: 'string', format: 'date', pattern: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$' },
                end: { type: 'string', format: 'date', pattern: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$' }
              }
            }
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
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
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
