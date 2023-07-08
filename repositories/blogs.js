const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { Blog, validateBlog } = require('../models/blogs');
const Response = require('../middlewares/response');

exports.blogCreation = asyncMiddleware(async (req, res, next) => {

    const { error } = validateBlog(req.body);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        await blog.save();
    } catch (error) {
        let response = Response('error');
        return res.status(response.statusCode).send(response);
    }

    let response = Response('success', '', blog);
    return res.send(response);
});

exports.listBlog = asyncMiddleware(async (req, res, next) => {
    var blogs = await Blog.find();

    let response = Response('success', '', blogs);
    return res.send(response);
});


exports.specifBlog = asyncMiddleware(async (req, res, next) => {
    var blog = await Blog.findById(req.params.id);

    let response = Response('success', '', {blog});

    return res.send(response);
});


exports.updateBlog = asyncMiddleware(async (req, res, next) => {
    var updateResponse = await Blog.updateOne({_id: req.query.id }, req.body);

    if ( updateResponse.modifiedCount == 0) {
        let response = Response('error');
        return res.status(response.statusCode).send(response);
    } 

    let response = Response('success', 'updated');
    return res.send(response);
});

exports.deleteBlog = asyncMiddleware(async (req, res, next) => {
    try {
        await Blog.deleteOne({ _id: req.query.id });
    } catch (error){
        let response = Response('error');
        return res.status(response.statusCode).send(response);
    }

    let response = Response('success', 'deleted');
    return res.send(response);
});