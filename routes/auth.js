const express = require('express');
const router = express.Router();
const Joi = require('joi');   
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;