const db = require('../config/db.config');

const TABLE = 'Categories';

async function getAllCategories() {
    return await db.select().from(TABLE);
}

async function getCategoryById(id) {
    return await db.select().from(TABLE).where('CategoryID', id);
}

module.exports = {
    getAllCategories,
    getCategoryById
};