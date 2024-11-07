const productService = require('../services/product.services');

async function getAllProducts(req, res, next) {
    try {
        const result = await productService.getAllProducts();
        const products = result.map(mapProductToResponse);
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getAllProductsWithFilter(req, res, next) {
    try {
        const filters = {
            sortBy: req.query.sortBy || null, 
            filters: {
                minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : 0,
                maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : 99999,
                name: req.query.name || '',
                categoryId: req.query.categoryId ? parseInt(req.query.categoryId) : null,
            },
            pagination: {
                page: req.query.page ? parseInt(req.query.page) : 1, 
                limit: req.query.limit ? parseInt(req.query.limit) : 10, 
            },
        };

        const result = await productService.getAllProductsWithFilter(filters);
        const products = {
            totalElements: result.totalElements,
            totalPages: result.totalPages,
            products: result.products.map(mapProductToResponse),
        }
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getProductById(req, res, next) {
    try {
        const result = await productService.getProductById(req.params.id);
        const product = mapProductToResponse(result);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

function mapProductToResponse(product) {
    return {
        productId: product.ProductID,
        productName: product.ProductName,
        briefDescription: product.BriefDescription,
        fullDescription: product.FullDescription,
        technicalSpecifications: product.TechnicalSpecifications,
        price: product.Price,
        imageUrl: product.ImageURL,
        categoryId: product.CategoryID,
    };
}

module.exports = {
    getAllProducts,
    getProductById,
    getAllProductsWithFilter
};