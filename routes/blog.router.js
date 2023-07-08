var express = require('express');
var router = express.Router();
var blogRepository = require('../repositories/blogs');

router.post('/creation', (req, res, next) => {
    blogRepository.blogCreation(req, res, next);
});

router.get('/blogs', (req, res, next) => {
    blogRepository.listBlog(req, res, next);
});

router.get('/blog/:id', (req, res, next) => {
    blogRepository.specifBlog(req, res, next);
});

router.put('/blog/:id', (req, res, next) => {
    blogRepository.updateBlog(req, res, next);
});

router.delete('/blog/:id', (req, res, next) => {
    blogRepository.deleteBlog(req, res, next);
});

module.exports = router;