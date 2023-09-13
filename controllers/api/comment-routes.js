const router = require('express').Router();
const { Comment } = require('../models');

// Add a Comment to a Post
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a Comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
