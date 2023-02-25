const mongoose = require('mongoose');
const Joi = require('joi');

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            maxlength: 25
        },
        color: {
            type: String,
            required: true
        },
        userId: mongoose.Schema.Types.ObjectId
    })
);

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().max(25).required(),
        color: Joi.string().required(),
        _id: Joi.objectId(),
        userId: Joi.objectId()
    });

    return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;