const express = require('express')
const router = express.Router()
const { getClasses, addClass, getClass, updateClass, deleteClass } = require('../controllers/classes')

router.get('/classes', getClasses)

router.post('/classes', addClass)

router.get('/classes/:id', getClass)

router.put('/classes/:id', updateClass)

router.delete('/classes/:id', deleteClass)

module.exports = router
