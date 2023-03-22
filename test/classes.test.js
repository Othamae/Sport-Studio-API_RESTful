
const { server } = require('../app')
const mongoose = require('mongoose')
const Class = require('../models/classes')
const { initialClasses, api } = require('./helpers')

beforeEach(async () => {
  await Class.deleteMany({})

  for (const classToSave of initialClasses) {
    const classObject = new Class(classToSave)
    await classObject.save()
  }

//   const class1 = new Class(initialClasses[0])
//   await class1.save()
//   const class2 = new Class(initialClasses[1])
//   await class2.save()
})

describe('GET /api/classes', () => {
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
})

describe('GET /api/classes/:id', () => {
  test('the first class is Class1', async () => {
    const response = await api.get('/api/classes')
    expect(response.body.data[0].name).toBe('Class1')
  })
})

describe('POST /api/classes', () => {
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
      .expect(201)
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
})

describe('DELETE /api/classes/:id', () => {
  test('a class can be deleted', async () => {
    const response = await api.get('/api/classes')
    // const names = response.body.data.map(data => data.name)

    const classToDelete = response.body.data[0]
    await api
      .delete(`/api/classes/${classToDelete.id}`)
      .expect(200)

    const newResponse = await api.get('/api/classes')
    const names = newResponse.body.data.map(data => data.name)

    expect(names).not.toContain(classToDelete.name)
    expect(newResponse.body.data).toHaveLength(initialClasses.length - 1)
  })

  test('a class that not exist can not be deleted', async () => {
    await api
      .delete('/api/classes/notExistingClass')
      .expect(403)

    const response = await api.get('/api/classes')
    const names = response.body.data.map(data => data.name)

    expect(names).not.toContain(response.name)
    expect(response.body.data).toHaveLength(initialClasses.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
