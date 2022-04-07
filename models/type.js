const mongoose = require('mongoose');
const Joi = require('joi');

const Type = mongoose.model(
    "Type",
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

function validateType(type) {
    const schema = Joi.object({
        name: Joi.string().max(25).required(),
        color: Joi.string().required()
    });

    return schema.validate(type);
}

exports.Type = Type;
exports.validate = validateType;