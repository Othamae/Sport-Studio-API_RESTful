const express = require('express')
const router = express.Router()
const { getAllInstructors, addInstructor, getInstructor, updateInstructor, deleteInstructor } = require('../controllers/instructors')

/**
 * @swagger
 * /api/instructors:
 *   get:
 *     summary: Returns a list of all instructors
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all instructors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   description: Error code
 *                   example: ERR500
 */
router.get('/instructors', getAllInstructors)

router.post('/instructors', addInstructor)

router.get('/instructors/:id', getInstructor)

router.put('/instructors/:id', updateInstructor)

router.delete('/instructors/:id', deleteInstructor)

module.exports = router
