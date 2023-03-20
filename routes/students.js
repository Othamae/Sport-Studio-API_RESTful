const express = require('express')
const router = express.Router()
const { getAllStudents, addStudent, getStudent, updateStudent, deleteStudent } = require('../controllers/students')

/**
 * @swagger
 * /api/instructors:
 *   get:
 *     summary: Returns a list of all instructors
 *     tags: [Students]
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
router.get('/students', getAllStudents)

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student user
 *     description: This can only be done by the logged in user as student
 *     tags: [Students]
 *     requestBody:
 *        description: Create a new student
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/User'
 *        required: true
 *     responses:
 *       200:
 *         description: Student successfully created!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       405:
 *          description: Invalid input!
 */
router.post('/students', addStudent)

router.get('/students/:id', getStudent)

router.put('/students/:id', updateStudent)

router.delete('/students/:id', deleteStudent)

module.exports = router
