const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');
const passport = require('../../config/passport');


router.get('/', function (req, res) {
    res.status(500).send('Not implemented yet');
});

router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/:id([\\da-z]{24})', passport.authenticate('jwt', { session: false }) ,async (req, res) => {
    const user_id = req.params.id;
    try {
        const user = await User.getById(user_id);
        if (!user)
            res.sendStatus(404);
        else 
            res.json(user);

    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;