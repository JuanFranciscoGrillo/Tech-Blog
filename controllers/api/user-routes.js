const router = require('express').Router();
const { User } = require('../models');

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not authenticated' });
};

// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const userData = await User.create({ username, password });
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json({ data: userData });
        });
    } catch (err) {
        console.error("Error signing up: ", err);
        res.status(500).json({ error: 'Error during sign-up' });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required for signing in' });
        }

        const userData = await User.findOne({ where: { username } });

        if (!userData) {
            return res.status(400).json({ message: 'No user with that username!' });
        }

        const validPassword = await userData.checkPassword(password);  // This function is assumed to be in your User model

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error("Error signing in: ", err);
        res.status(500).json({ error: 'Error during sign-in' });
    }
});

// Sign Out
router.post('/signout', isAuthenticated, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).json({ error: 'Not logged in' });
    }
});

module.exports = router;
