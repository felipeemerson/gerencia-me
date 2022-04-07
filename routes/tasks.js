const express = require('express');
const router = express.Router();

const validate_middleware = require('../middlewares/validation');
const auth = require('../middlewares/auth');

module.exports = router;