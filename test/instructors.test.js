const { server } = require('../app')
const mongoose = require('mongoose')
const { encrypt } = require('../middlewares/handlePassword')
const Instructor = require('../models/instructors')
const { api, getInstructorsDB } = require('./helpers')

beforeEach(async () => {
  await Instructor.deleteMany({})

  const passwordHash = await encrypt('TextPlainPassword')
  const instructor = new Instructor({
    name: 'Instructor1',
    email: 'email1@email.com',
    password: passwordHash
  })

  await instructor.save()
})

describe('GET /api/instructors', () => {
  test('instructors are returned as json', async () => {
    await api
      .get('/api/instructors')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST /api/instructors', () => {
  test('instructor creation works as expected', async () => {
    const instructorAtStart = await getInstructorsDB()

    const newInstructor = {
      name: 'newInstructor',
      email: 'new@email.com',
      password: 'newPassword'
    }
    await api
      .post('/api/instructors')
      .send(newInstructor)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const instructorAtEnd = await getInstructorsDB()
    const instructorsEmails = instructorAtEnd.map(e => e.email)

    expect(instructorsEmails).toContain(newInstructor.email)
    expect(instructorAtEnd).toHaveLength(instructorAtStart.length + 1)
  })

  test('creation fails if instructor already created', async () => {
    const instructorAtStart = await getInstructorsDB()

    const newInstructor = {
      name: 'newInstructor',
      email: 'email1@email.com',
      password: 'newPassword'
    }
    const result = await api
      .post('/api/instructors')
      .send(newInstructor)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('ERROR_CREATING_INSTRUCTOR')

    const instructorAtEnd = await getInstructorsDB()
    expect(instructorAtEnd).toHaveLength(instructorAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
