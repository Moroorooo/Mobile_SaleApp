require('dotenv').config();
const authService = require('../services/auth.services');
const userService = require('../services/user.services');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function login(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.PasswordHash);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Password is incorrect'
            });
        }

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const payload = {
            userId: user.UserId,
            email: user.Email,
        };

        const accessToken = await authService.generateToken(payload, accessTokenLife, accessTokenSecret);

        if (!accessToken) {
            return res.status(400).json({
                message: 'Generate token failed'
            });
        }

        return res.json({
            message: 'Login successfully',
            user: {
                userId: user.UserID,
                userName: user.Username,
                email: user.Email,
                phoneNumber: user.PhoneNumber,
                address: user.Address,
                role: user.Role
            },
            accessToken: accessToken
        });
    } catch (error) {
        next(error);
    }
}

async function register(req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;

        const user = await userService.getUserByEmail(email);
        if (user) {
            return res.status(400).json({
                message: 'Email is already used'
            });
        } else {
            if (password !== confirmPassword) {
                return res.status(400).json({
                    message: 'Password does not match'
                });
            }

            const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS);
            const newUser = {
                username: username,
                password: hashedPassword,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
            }

            const createdUser = await authService.register(newUser);
            if (!createdUser) {
                return res.status(400).json({
                    message: 'Register failed'
                });
            }
            const responseUser = createdUser[0];
            return res.json({
                message: 'Register successfully',
                user: {
                    userId: responseUser.UserID,
                    userName: responseUser.Username,
                    email: responseUser.Email,
                    phoneNumber: responseUser.PhoneNumber,
                    address: responseUser.Address,
                    role: responseUser.Role
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register
};