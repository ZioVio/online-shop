const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const utils = require('../../models/user/utils');
const User = require('../../models/user/user');

router.post('/register', async (req, res) => {
    if (!req.body.login || !req.body.password) {
        res.status(400).json({
            messgae: 'Login and password fields cant be empty'
        });
        return;
    }
    const futureUser = await User.getByLogin(req.body.login);

    if (futureUser) {
        res.status(409).json({
            message: 'Account with such login is found'
        });
    } else {

        const passwordHash = utils.getHash(req.body.password);
        const user = {
            first_name: req.body.first_name || '',
            last_name: req.body.last_name || '',
            login: req.body.login,
            passwordHash: passwordHash,
            role: 'customer'
        };
        try {
            const reply = await User.insert(user);
            res.status(201).json(reply);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message ? error.message : error
            })
        }
    }
});

// async function checkReqFromTelegram(req, res, next) {
//     if (!req.body) {
//         next({
//             status: 400, 
//             message: 'Request body must not be empty. See https://core.telegram.org/widgets/login for help'
//         });
//         return;
//     }
//     const checkString = Object.entries(req.body)
// }

router.post('/login/telegram', async (req, res, next) => {
    const telegramId = req.body.id;
    const foundUser = User.getByTelegramId(telegramId);
});

router.post('/login', async (req, res, next) => {
    const login = req.body.login || '';
    try {
        const futureUser = await User.getByLogin(login).select('_id role passwordHash');
        if (!futureUser) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        
        const passwordValidated = utils.validatePassword(req.body.password, futureUser.passwordHash);

        if (!passwordValidated) {
            next({
                status: 401,
                message: 'Wrong password'
            });
            return;
        }

        const token = utils.generateJWT(futureUser);
        const decodedToken = jwt.decode(token);

        const response = {
            token: `Bearer ${token}`,
            user: decodedToken
        };
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
});


module.exports = router;