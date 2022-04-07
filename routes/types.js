const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { Type, validate } = require('../models/type');

router.post('/', [auth, validate_middleware(validate)], async (req, res) => {
    const type = new Type({
        name: req.body.name,
        color: req.body.color,
        userId: req.user._id
    });

    await type.save();

    return res.send(type);
});

module.exports = router;