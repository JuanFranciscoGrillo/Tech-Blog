const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get All Posts for Homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
            order: [['createdAt', 'DESC']]
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Specific Post with Comments
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [User, {
                model: Comment,
                include: [User]
            }]
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a New Post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update an Existing Post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a Post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
