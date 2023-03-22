const supertest = require('supertest')
const { app } = require('../app')
const Instructor = require('../models/instructors')

const api = supertest(app)

const initialClasses = [
  {
    name: 'Class1',
    time: '18:00',
    instructor: 'Instructor1',
    level: 'adult',
    capacity: 9,
    duration: {
      lections: 12,
      start: '22/03/2023',
      end: '07/06/2023'
    }
  },
  {
    name: 'Class2',
    time: '18:00',
    instructor: 'Instructor2',
    level: 'child',
    capacity: 6,
    duration: {
      lections: 8,
      start: '22/03/2023',
      end: '07/06/2023'
    }
  }
]

const getInstructorsDB = async () => {
  const instructorsDB = await Instructor.find({})
  return instructorsDB.map(instructor => instructor.toJSON())
}

module.exports = { initialClasses, api, getInstructorsDB }
