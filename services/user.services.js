const db = require('../config/db.config');

const TABLE = 'Users';

async function getAllUser() {
    try {
        const data = await db.select().from(TABLE);
        return data;
    } catch (error) {
        return null;
    }
}

async function getUserByEmail(email) {
    try {
        const data = await db.select().from(TABLE).where('Email', email).first();
        return data;
    } catch (error) {
        console.log(`Error in getUserByEmail: ${error}`);
        return null;
    }
}

async function getUserById(id) {
    try {
        const data = await db.select().from(TABLE).where('UserId', id).first();
        return data;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAllUser,
    getUserByEmail,
    getUserById
};