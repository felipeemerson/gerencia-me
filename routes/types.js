const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { Type, validate } = require('../models/type');

router.post('/', [auth, validate_middleware(validate)], async (req, res) => {
    let type = await Type.findOne({ name: req.body.name });
    if (type) return res.status(400).send("Type already registered");

    type = new Type({
        name: req.body.name,
        color: req.body.color,
        userId: req.user._id
    });

    await type.save();

    return res.send(type);
});

router.get('/', auth, async (req, res) => {
    const types = await Type.find({ userId: req.user._id });

    return res.send(types);
});

router.put('/:id', [auth, validate_middleware(validate)], async (req, res) => {
    const type = await Type.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        color: req.body.color
    }, { new: true });

    if (!type) return res.status(404).send("The type with the given ID was not found.");

    return res.send(type);
});

router.delete('/:id', auth, async (req, res) => {
    const type = await Type.findByIdAndRemove(req.params.id);

    if (!type) return res.status(404).send("The type with the given ID was not found.");

    return res.send(type);
})

module.exports = router;