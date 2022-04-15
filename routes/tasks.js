const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { Task, validate } = require('../models/task');
const { Type } = require('../models/type');

router.post('/', [auth, validate_middleware(validate)], async (req, res) => {
    const task = new Task({
        title: req.body.title,
        status: req.body.status,
        userId: req.user._id
    });

    const hasType = Boolean(req.body.typeId);

    if (hasType) {
        const type = await Type.findById(req.body.typeId);
        if (!type) return res.status(400).send("The type with the given typeId was not found.");

        task.typeId = req.body.typeId;
    }

    await task.save();

    return res.send(task);
});

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });

    return res.send(tasks);
});

router.put('/:id', [auth, validate_middleware(validate)], async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        status: req.body.status,
        typeId: req.body.typeId
    }, { new: true });
    
    if (!task) return res.status(404).send("The task with the given ID was not found.");
    
    return res.send(task);
});

router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send("The task with the given ID was not found.");

    return res.send(task);
});

module.exports = router;