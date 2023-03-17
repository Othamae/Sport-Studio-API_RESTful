const express = require('express')
const router = express.Router()
const { getClasses, addClass, getClass, updateClass, deleteClass } = require('../controllers/classes')

/**
 * @swagger
 * /api/classes:
 *  get:
 *     summary: Returns the list of all the Poledance classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: The list of all the classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Class'
 */
router.get('/classes', getClasses)

router.post('/classes', addClass)

router.get('/classes/:id', getClass)

router.put('/classes/:id', updateClass)

router.delete('/classes/:id', deleteClass)

module.exports = router
