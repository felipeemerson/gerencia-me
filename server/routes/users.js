const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const { User, validate } = require('../models/user');

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).send("The user with the given ID was not found");

    return res.send(user);
});

router.post('/', validate_middleware(validate), async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

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