const express = require('express')
const router = express.Router()
const { getAllStudents, getStudent, updateStudent, deleteStudent } = require('../controllers/students')

/**
 * @swagger
 * /api/students:
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
 * /api/students/{id}:
 *  get:
 *     summary: Find a student by ID
 *     description: Returns a single student
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The detail of a student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Users'
 */
router.get('/students/:id', getStudent)

/**
 * @swagger
 * /api/students/{id}:
 *  put:
 *     summary: Update an existing student
 *     description: Update an existing student by ID
 *     tags: [Students]
 *     requestBody:
 *        description: Update an existing student by ID
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Users'
 *        required: true
 *     responses:
 *       200:
 *         description: Student successfully updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Users'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *          description: Student not found
 *       405:
 *          description: Validation exception
 *
 */
router.put('/students/:id', updateStudent)

/**
 * @swagger
 * /api/students/{id}:
 *  delete:
 *     summary: Delete a student
 *     description: Delete an existing student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: api_key
 *         in: header
 *         description: ''
 *         required: false
 *         schema:
 *              type: string
 *       - name: studentId
 *         in: header
 *         description: ''
 *         required: true
 *         schema:
 *              type: integer
 *              format: int64
 *     requestBody:
 *        description: Update an existing student by ID
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Users'
 *        required: true
 *     responses:
 *       200:
 *         description: Student successfully deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Users'
 *       400:
 *          description: Invalid ID supplied
 *
 *
 */
router.delete('/students/:id', deleteStudent)

module.exports = router
