const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

const validate_middleware = require('../middlewares/validation');

const { User, validate } = require('../models/user');

router.post('/', validate_middleware(validate), async(req, res) => {
    let user = User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    return res.header('Authorization', token).send({
        name: user.name,
        email: user.email,
        _id: user._id
    });
});

module.exports = router;