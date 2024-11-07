const categoryService = require('../services/category.services');

async function getAllCategories(req, res, next) {
    try {
        const result = await categoryService.getAllCategories();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getCategoryById(req, res, next) {
    try {
        const result = await categoryService.getCategoryById(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById
};