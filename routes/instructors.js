const express = require('express')
const router = express.Router()
const { getAllInstructors, getInstructor, updateInstructor, deleteInstructor } = require('../controllers/instructors')

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
 * /api/instructors/{id}:
 *  get:
 *     summary: Find a instructor by ID
 *     description: Returns a single instructor
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: The detail of a instructor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Users'
 */
router.get('/instructors/:id', getInstructor)

/**
 * @swagger
 * /api/instructors/{id}:
 *  put:
 *     summary: Update an existing instructor
 *     description: Update an existing instructor by ID
 *     tags: [Instructors]
 *     requestBody:
 *        description: Update an existing instructor by ID
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Users'
 *        required: true
 *     responses:
 *       200:
 *         description: Instructor successfully updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Users'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *          description: Instructor not found
 *       405:
 *          description: Validation exception
 *
 */
router.put('/instructors/:id', updateInstructor)

/**
 * @swagger
 * /api/instructors/{id}:
 *  delete:
 *     summary: Delete a instructor
 *     description: Delete an existing instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: api_key
 *         in: header
 *         description: ''
 *         required: false
 *         schema:
 *              type: string
 *       - name: instructorId
 *         in: header
 *         description: ''
 *         required: true
 *         schema:
 *              type: integer
 *              format: int64
 *     requestBody:
 *        description: Update an existing instructor by ID
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Users'
 *        required: true
 *     responses:
 *       200:
 *         description: Instructor successfully deleted!
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
router.delete('/instructors/:id', deleteInstructor)

module.exports = router
