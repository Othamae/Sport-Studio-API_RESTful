const express = require('express')
const router = express.Router()
const { userLogin, userRegister } = require('../controllers/users')
// const { authMiddleware } = require('../middlewares/authMiddleware')
const { checkUserRole } = require('../middlewares/checkRole')

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logs user into the system
 *     tags: [Users]
 *     requestBody:
 *       description: Request body containing user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email for registration
 *                 example: email@example.com
 *               password:
 *                 type: string
 *                 description: The password for register in clear text
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully Login!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid username/password supplied
 */
router.post('/user/login', userLogin)

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register user into the system
 *     tags: [Users]
 *     requestBody:
 *       description: Request body containing user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email for registration
 *                 example: email@example.com
 *               password:
 *                 type: string
 *                 description: The password for register in clear text
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: Type of user (instructor or student)
 *                 enum:
 *                    - instructor
 *                    - student
 *                 example: student
 *               ageGroup:
 *                 type: string
 *                 description: Type of student (child or adult)
 *                 enum:
 *                    - adult
 *                    - child
 *                 example: adult
 *     responses:
 *       200:
 *         description: Successfully Register!
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
router.post('/user/register', checkUserRole, userRegister)

module.exports = router
