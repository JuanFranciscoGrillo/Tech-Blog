const router = require('express').Router();
const { Comment } = require('../models');

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not authenticated' });
};

// Add a Comment to a Post
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { text, userId, postId } = req.body;

        if (!text || !userId || !postId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newComment = await Comment.create({ text, userId, postId });
        res.status(200).json({ data: newComment });
    } catch (err) {
        console.error("Error in creating comment: ", err);
        res.status(400).json({ error: 'Error in adding comment' });
    }
});

// Delete a Comment
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(204).end(); // No content response for successful deletion
    } catch (err) {
        console.error("Error in deleting comment: ", err);
        res.status(500).json({ error: 'Error in deleting comment' });
    }
});

module.exports = router;
