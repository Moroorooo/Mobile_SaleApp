const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management routes
 *
 * /users:
 *   get:
 *     summary: Get a user by email
 *     tags: [User]
 *     description: Retrieve a single user by their email
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The user's email address
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: "123"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *       404:
 *         description: User not found
 *
 * /users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [User]
 *     description: Retrieve a single user by their id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's id
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: "123"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *       404:
 *         description: User not found
 */

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);

module.exports = router;