const mongoose = require('mongoose');
const Joi = require('joi');

const STATUS_ENUM = ['To Do', 'Doing', 'Done'];

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            maxlength: 100
        },
        status: {
            type: String,
            enum: STATUS_ENUM,
            required: true
        },
        userId: mongoose.Schema.Types.ObjectId,
        typeId: mongoose.Schema.Types.ObjectId
    })
);

function validateTask(task) {
    const schema = Joi.object({
        title: Joi.string().max(100).required(),
        status: Joi.string().valid(...STATUS_ENUM).required(),
        userId: Joi.objectId().required(),
        typeId: Joi.objectId().required()
    });

    return schema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;