const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById } = require('../controllers/category.controllers');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management routes
 * /categories:
 *   get:
 *    summary: Get all categories
 *    tags: [Category]
 *    description: Retrieve a list of all categories
 *    responses:
 *      200:
 *        description: A list of categories
 *      404:
 *        description: No categories found
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     description: Retrieve a single category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A single category
 *       404:
 *         description: Category not found
 */
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

module.exports = router;