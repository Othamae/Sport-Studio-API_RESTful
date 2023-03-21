const express = require('express')
const router = express.Router()
const { getClasses, addClass, getClass, updateClass, deleteClass } = require('../controllers/classes')
const { validatorGetClass, validatorCreateClass } = require('../validators/classes')

/**
 * @swagger
 * /api/classes:
 *  get:
 *     summary: Find the list of classes
 *     description: Returns the list of all the Poledance classes
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

/**
 * @swagger
 * /api/classes:
 *  post:
 *     summary: Add a new Poledance class
 *     description: Create a new Poledance class
 *     tags: [Classes]
 *     requestBody:
 *        description: Add a new class to the system
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Class'
 *     required: true
 *     responses:
 *       201:
 *         description: Class successfully created!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Class'
 *       405:
 *          description: Invalid input!
 *
 */
router.post('/classes', validatorCreateClass, addClass)

/**
 * @swagger
 * /api/classes/{id}:
 *  get:
 *     summary: Find a class by ID
 *     description: Returns a single class
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: The detail of a single class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Class'
 */
router.get('/classes/:id', validatorGetClass, getClass)

/**
 * @swagger
 * /api/classes/{id}:
 *  put:
 *     summary: Update an existing class
 *     description: Update an existing class by ID
 *     tags: [Classes]
 *     requestBody:
 *        description: Update an existing class by ID
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Class'
 *        required: true
 *     responses:
 *       200:
 *         description: Class successfully updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Class'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *          description: Class not found
 *       405:
 *          description: Validation exception
 *
 */
router.put('/classes/:id', validatorCreateClass, validatorGetClass, updateClass)

/**
 * @swagger
 * /api/classes/{id}:
 *  delete:
 *     summary: Delete a class
 *     description: Delete an existing class by ID
 *     tags: [Classes]
 *     parameters:
 *       - name: api_key
 *         in: header
 *         description: ''
 *         required: false
 *         schema:
 *              type: string
 *       - name: classId
 *         in: header
 *         description: ''
 *         required: true
 *         schema:
 *              type: integer
 *              format: int64
 *     requestBody:
 *        description: Update an existing class by ID
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#components/schemas/Class'
 *        required: true
 *     responses:
 *       200:
 *         description: Class successfully deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Class'
 *       400:
 *          description: Invalid ID supplied
 *
 *
 */
router.delete('/classes/:id', validatorGetClass, deleteClass)

module.exports = router
