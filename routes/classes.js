const express = require('express')
const router = express.Router()
const { getClasses, addClass, getClass, updateClass, deleteClass } = require('../controllers/classes')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { validatorGetClass, validatorCreateClass } = require('../validators/classes')

/**
 * @swagger
 * /api/classes:
 *  get:
 *     summary: Find the list of classes
 *     description: Returns the list of all the Sport classes
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
 *     summary: Add a new Sport class
 *     description: Create a new Sport class
 *     tags: [Classes]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *        - in: header
 *          name: Authorization
 *          description: Access token needed to authorize the request
 *          required: true
 *          type: string
 *     requestBody:
 *        description: Add a new class to the system
 *        content:
 *          application/json:
 *             schema:
 *                example: {
 *                  "name": "Class1",
 *                  "time": "18:00",
 *                  "instructor": "641d65ed2fc7f899dcec9b1c",
 *                  "level": "adult",
 *                  "capacity": 9,
 *                  "duration": {
 *                      "lections": 12,
 *                      "start": "22/03/2023",
 *                      "end": "07/06/2023"
 *                  },
 *                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                }
 *     required: true
 *     responses:
 *       201:
 *         description: The class has been successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Class'
 *       400:
 *         description: Invalid input parameters
 *       401:
 *         description: Unauthorized, authentication required
 *       500:
 *         description: Internal server error
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: http
 *     name: bearer
 *     bearerFormat: JWT
 */
router.post('/classes', authMiddleware, validatorCreateClass, addClass)

/**
 * @swagger
 * /api/classes/{classId} :
 *  get:
 *     summary: Find a class by ID
 *     description: Returns a single class
 *     tags: [Classes]
 *     parameters:
 *       - name: classId
 *         in: path
 *         description: ID of the class that needs to be fetched
 *         required: true
 *
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
 * /api/classes/{classId}:
 *  put:
 *     summary: Update an existing class
 *     description: Update an existing class by ID
 *     tags: [Classes]
 *     requestBody:
 *        description: Update an existing class by ID
 *        content:
 *          application/json:
 *             schema:
 *                example:
 *                  name: UPDATED Class
 *                  time: 20:00
 *                  instructor: UPDATED Instructor
 *                  level: child
 *                  capacity: 10
 *                  duration:
 *                      lections: 12
 *                      start: 22/03/2023
 *                      end: 07/06/2023
 *        required: true
 *     parameters:
 *       - name: classId
 *         in: path
 *         description: ID of the class that needs to be fetched
 *         required: true
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
router.put('/classes/:id', authMiddleware, validatorCreateClass, validatorGetClass, updateClass)

/**
 * @swagger
 * /api/classes/{classId}:
 *  delete:
 *     summary: Delete a class
 *     description: Delete an existing class by ID
 *     tags: [Classes]
 *     parameters:
 *       - name: classId
 *         in: path
 *         description: ID of the class that needs to be deleted
 *         required: true
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
router.delete('/classes/:id', authMiddleware, validatorGetClass, deleteClass)

module.exports = router
