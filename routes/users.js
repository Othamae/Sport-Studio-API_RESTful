const express = require('express')
const router = express.Router()
const { userLogin, userRegister, userLogout } = require('../controllers/users')
// const { authMiddleware } = require('../middlewares/authMiddleware')
const { checkUserRole } = require('../middlewares/checkRole')

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logs user into the system
 *     tags: [Users]
 *     parameters:
 *       - name: email
 *         in: query
 *         description: The email for login
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: The password for login in clear text
 *         required: true
 *         schema:
 *           type: string
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
 *     parameters:
 *       - name: username
 *         in: query
 *         description: The user name for login
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: The password for login in clear text
 *         required: true
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         description: Type of user (instructor or student)
 *         required: true
 *         explode: true
 *         schema:
 *           type: string
 *           default: Student
 *           enum:
 *              - Student
 *              - Instructor
 *       - name: Student
 *         in: query
 *         description: Type of student (child or adult)
 *         required: true
 *         explode: true
 *         schema:
 *           type: string
 *           default: adult
 *           enum:
 *              - adult
 *              - child
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

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Logs out current logged in user session
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully Logout!
 */
router.get('/user/logout', userLogout)

module.exports = router
