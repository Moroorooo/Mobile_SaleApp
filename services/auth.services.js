const db = require('../config/db.config');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const TABLE = 'Users';

async function login(username, password) {
    try {
        const data = await db(TABLE).where({
            Username: username,
            PasswordHash: password
        });
        return data;
    } catch (error) {
        return null;
    }
}

async function register(user) {
    try {
        const { username, password, email, phoneNumber, address } = user;
        const data = await db(TABLE).insert({
            Username: username,
            PasswordHash: password,
            Email: email,
            PhoneNumber: phoneNumber,
            Address: address,
            Role: 'Customer'
        }).returning('*');
        return data;
    } catch (error) {
        console.log(`Error in register: ${error}`);
        return null;
    }
}

async function generateToken(payload, accessTokenLife, accessTokenSecret) {
    try {
        const accessToken = await sign(
            { payload },
            accessTokenSecret,
            {
                algorithm: 'HS256',
                expiresIn: accessTokenLife
            });
        return accessToken;
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
}

async function verifyToken(token, secret) {
    try {
        const decoded = await verify(token, secret);
        return decoded;
    } catch (error) {
        console.log(`Error in verify token: ${error}`);
        return null;
    }
}

module.exports = {
    login,
    register,
    generateToken,
    verifyToken
}