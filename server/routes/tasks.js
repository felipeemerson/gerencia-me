const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { Task, validate } = require('../models/task');
const { Category } = require('../models/category');

router.post('/', [auth, validate_middleware(validate)], async (req, res) => {
    const task = new Task({
        title: req.body.title,
        status: req.body.status,
        userId: req.user._id
    });

    const hasCategory = Boolean(req.body.categoryId);

    if (hasCategory) {
        const category = await Category.findById(req.body.categoryId);
        if (!category) return res.status(400).send("The category with the given categoryId was not found");

        task.categoryId = req.body.categoryId;
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
        categoryId: req.body.categoryId
    }, { new: true });
    
    if (!task) return res.status(404).send("The task with the given ID was not found");
    
    return res.send(task);
});

router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send("The task with the given ID was not found");

    return res.send(task);
});

router.delete('/status/:status', auth, async (req, res) => {
    const validStatuses = ['todo', 'doing', 'done'];
    if (!validStatuses.includes(req.params.status)) return res.status(400).send("Invalid status");

    await Task.deleteMany({ userId: req.user._id, status: req.params.status });

    return res.send();
})

module.exports = router;