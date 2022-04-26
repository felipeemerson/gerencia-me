const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { Category, validate } = require('../models/category');

router.post('/', [auth, validate_middleware(validate)], async (req, res) => {
    let category = await Category.findOne({ name: req.body.name, userId: req.user._id });
    if (category) return res.status(400).send("Category already registered");

    category = new Category({
        name: req.body.name,
        color: req.body.color,
        userId: req.user._id
    });

    await category.save();

    return res.send(category);
});

router.get('/', auth, async (req, res) => {
    const types = await Category.find({ userId: req.user._id });

    return res.send(types);
});

router.put('/:id', [auth, validate_middleware(validate)], async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        color: req.body.color
    }, { new: true });

    if (!category) return res.status(404).send("The category with the given ID was not found");

    return res.send(category);
});

router.delete('/:id', auth, async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).send("The category with the given ID was not found");

    return res.send(category);
})

module.exports = router;