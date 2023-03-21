
const { server } = require('../app')
const mongoose = require('mongoose')
const Class = require('../models/classes')
const { initialClasses, api } = require('./helpers')

beforeEach(async () => {
  await Class.deleteMany({})
  const class1 = new Class(initialClasses[0])
  await class1.save()
  const class2 = new Class(initialClasses[1])
  await class2.save()
})

test('classes are returned as json', async () => {
  await api
    .get('/api/classes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two classes', async () => {
  const response = await api.get('/api/classes')
  expect(response.body.data).toHaveLength(initialClasses.length)
})

test('the first class is Class1', async () => {
  const response = await api.get('/api/classes')
  expect(response.body.data[0].name).toBe('Class1')
})

test('a valid class can be added', async () => {
  const newClass = {
    name: 'Class3',
    time: '18:00',
    instructor: 'Instructor3',
    level: 'adult',
    capacity: 9,
    duration: {
      lections: 14,
      start: '22/03/2023',
      end: '07/06/2023'
    }
  }
  await api
    .post('/api/classes')
    .send(newClass)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/classes')
  const names = response.body.data.map(data => data.name)

  expect(names).toContain(newClass.name)
  expect(response.body.data).toHaveLength(initialClasses.length + 1)
})

test('a class without information is not added', async () => {
  const newClass = {
    time: '18:00',
    instructor: 'Instructor3',
    level: 'adult',
    capacity: 9

  }
  await api
    .post('/api/classes')
    .send(newClass)
    .expect(403)

  const response = await api.get('/api/classes')
  expect(response.body.data).toHaveLength(initialClasses.length)
})

test('a class can be deleted', async () => {
  const response = await api.get('/api/classes')
  // const names = response.body.data.map(data => data.name)

  const classToDelete = response.body.data[0]
  await api
    .delete(`/api/classes/${classToDelete.id}`)
    .expect(200)

  const newResponse = await api.get('/api/classes')
  expect(newResponse.body.data).toHaveLength(initialClasses.length - 1)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
