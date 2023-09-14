// Import necessary modules and models
const router = require('express').Router();
const { User } = require('../../models');

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

        // Create a new user
        const userData = await User.create({ username, password });
        
        // Save session data
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

        // Find user by username
        const userData = await User.findOne({ where: { username } });

        if (!userData) {
            return res.status(400).json({ message: 'No user with that username!' });
        }

        // Check password
        const validPassword = await userData.checkPassword(password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        // Save session data
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

// Export the router for use in the application
module.exports = router;
