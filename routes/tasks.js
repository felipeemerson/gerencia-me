const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { Task, validate } = require('../models/task');

router.post('/', [auth, validate_middleware(validate)], async (req, res) => {
    const task = new Task({
        title: req.body.title,
        status: req.body.status,
        userId: req.user._id,
        typeId: req.body.typeId
    });

    await task.save();

    return res.send(task);
});

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });

    return res.send(tasks);
});

module.exports = router;