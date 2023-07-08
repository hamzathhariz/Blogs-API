const Joi = require('joi');
const mongoose = require('mongoose');
// const isObjectId = require('./validation/isObjectId');


const blogSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required:  true
    }
});

exports.Blog = mongoose.model('Blog', blogSchema);

exports.validateBlog = function validateBlog(data) {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string().required()
    });

    return schema.validate(data);
}