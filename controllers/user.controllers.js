const userService = require('../services/user.services');

async function getAllUser(req, res, next) {
    try {
        const email = req.query.email;
        if(email) {
            const result = await userService.getUserByEmail(email);
            res.json(result);
            return;
        }
        const result = await userService.getAllUser();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        const response = {
            userId: user.UserID,
            userName: user.Username,
            email: user.Email,
            phoneNumber: user.PhoneNumber,
            address: user.Address,
            role: user.Role
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUser,
    getUserById
};