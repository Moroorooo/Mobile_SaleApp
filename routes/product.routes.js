const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getAllProductsWithFilter } = require('../controllers/product.controllers');
const authMiddlewares = require('../middlewares/auth.mdw');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management routes
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     description: Retrieve a list of all products
 *     responses:
 *       200:
 *         description: A list of products
 *       404:
 *         description: No products found
 * /products/filters:
 *   get:
 *     summary: Get all products with filter
 *     tags: [Product]
 *     description: Retrieve a list of all products with optional sorting and filtering.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter products by name (supports partial matches).
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [price, popularity, category]
 *         description: Sort products by specified criteria.
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter products with a minimum price.
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter products with a maximum price.
 *       - in: query
 *         name: categoryId
 *         required: false
 *         schema:
 *           type: string  # Assuming categoryId is a string; adjust if it's a number
 *         description: Filter products by category ID.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: A list of products
 *       404:
 *         description: No products found
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     description: Retrieve a single product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *       404:
 *         description: Product not found
 */
router.get('/', getAllProducts);
router.get('/filters', getAllProductsWithFilter);
router.get('/:id', getProductById);

module.exports = router;