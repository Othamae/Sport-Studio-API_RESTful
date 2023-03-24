const { server } = require('../app')
const mongoose = require('mongoose')
const { encrypt } = require('../middlewares/handlePassword')
const User = require('../models/users')
const { api, getUserDB } = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await encrypt('TextPlainPassword')
  const instructor = new User({
    name: 'Instructor1',
    email: 'instructor1@email.com',
    password: passwordHash,
    role: 'instructor',
    isAdmin: true
  })
  const student = new User({
    name: 'Student1',
    email: 'student1@email.com',
    password: passwordHash,
    role: 'student',
    ageGroup: 'adult'
  })

  await instructor.save()
  await student.save()
})

describe('GET /api/instructors', () => {
  test('instructors are returned as json', async () => {
    await api
      .get('/api/instructors')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('GET /api/students', () => {
  test('students are returned as json', async () => {
    await api
      .get('/api/students')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST /api/user/register', () => {
  test('Instructor creation works as expected', async () => {
    const userAtStart = await getUserDB()

    const newInstructor = {
      name: 'newInstructor',
      email: 'newInstructor@email.com',
      password: 'newPassword',
      role: 'instructor',
      isAdmin: true
    }
    await api
      .post('/api/user/register')
      .send(newInstructor)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await getUserDB()
    const usersEmail = userAtEnd.map(user => user.email)

    expect(usersEmail).toContain(newInstructor.email)
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)
  })

  test('Student creation works as expected', async () => {
    const userAtStart = await getUserDB()

    const newStudent = {
      name: 'newStudent',
      email: 'newStudent@email.com',
      password: 'newPassword',
      role: 'student',
      ageGroup: 'adult'
    }
    await api
      .post('/api/user/register')
      .send(newStudent)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await getUserDB()
    const usersEmail = userAtEnd.map(e => e.email)

    expect(usersEmail).toContain(newStudent.email)
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)
  })

  test('creation fails if instructor already created', async () => {
    const usersAtStart = await getUserDB()

    const newInstructor = {
      name: 'newInstructor',
      email: 'instructor1@email.com',
      password: 'newPassword',
      role: 'instructor',
      isAdmin: true
    }
    const result = await api
      .post('/api/user/register')
      .send(newInstructor)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('EMAIL_ALREADY_EXIST')

    const usersAtEnd = await getUserDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if student already created', async () => {
    const usersAtStart = await getUserDB()

    const newStudent = {
      name: 'newStudent',
      email: 'student1@email.com',
      password: 'newPassword',
      role: 'student',
      ageGroup: 'adult'
    }
    const result = await api
      .post('/api/user/register')
      .send(newStudent)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('EMAIL_ALREADY_EXIST')

    const usersAtEnd = await getUserDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if ageGroup missing from new student', async () => {
    const usersAtStart = await getUserDB()

    const newStudent = {
      name: 'newStudent',
      email: 'student1@email.com',
      password: 'newPassword',
      role: 'student',
      ageGroup: ''
    }
    const result = await api
      .post('/api/user/register')
      .send(newStudent)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('ageGroup IS_REQUIRED')

    const usersAtEnd = await getUserDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('POST /api/user/login', () => {
  test('Login success if password is correct', async () => {
    const user = {
      email: 'instructor1@email.com',
      password: 'TextPlainPassword'
    }

    await api
      .post('/api/user/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Login fails if password is incorrect', async () => {
    const user = {
      email: 'instructor1@email.com',
      password: 'OtroPassword'
    }

    const result = await api
      .post('/api/user/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('INCORRECT_USER_OR_PASSWORD')
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
