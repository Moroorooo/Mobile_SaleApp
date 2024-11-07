const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 * /auths/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized, invalid credentials
 * /auths/register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm password of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *               address:
 *                 type: string
 *                 description: Address of the user
 *             required:
 *               - username
 *               - password
 *               - confirmPassword
 *               - email
 *               - phoneNumber
 *               - address
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Invalid input, object invalid
 */
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;