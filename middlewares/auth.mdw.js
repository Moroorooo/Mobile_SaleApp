require('dotenv').config();
const authService = require('../services/auth.services');
const userService = require('../services/user.services');

async function isAuth(req, res, next) {
    // Get access token from request header
    const accessToken = req.header('Authorization');
    if (!accessToken) {
        return res.status(401).json({
            message: 'Access token not found'
        });
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenWithoutBearer = accessToken.slice(7);

    // Verify access token
    const decoded = await authService.verifyToken(accessTokenWithoutBearer, accessTokenSecret);
    if (!decoded) {
        return res.status(401).json({
            message: 'Access token is not valid'
        });
    }

    const user = await userService.getUserByEmail(decoded.email);
    req.user = user;

    return next();
}

module.exports = {
    isAuth
};