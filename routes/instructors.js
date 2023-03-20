const express = require('express')
const router = express.Router()
const { getAllInstructors, addInstructor, getInstructor, updateInstructor, deleteInstructor } = require('../controllers/instructors')

/**
 * @swagger
 * /api/instructors:
 *   get:
 *     summary: Returns a list of all instructors
 *     tags: [Instructors]
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

/**
 * @swagger
 * /api/instructors:
 *   post:
 *     summary: Create a new instructor user
 *     description: This can only be done by the logged in user as instructor
 *     tags: [Instructors]
 *     requestBody:
 *        description: Create a new instructor
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/User'
 *     required: true
 *     responses:
 *       200:
 *         description: Instructor successfully created!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       405:
 *          description: Invalid input!
 */
router.post('/instructors', addInstructor)

router.get('/instructors/:id', getInstructor)

router.put('/instructors/:id', updateInstructor)

router.delete('/instructors/:id', deleteInstructor)

module.exports = router
