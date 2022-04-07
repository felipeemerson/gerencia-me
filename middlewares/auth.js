const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.decode(token, 'Gerenciame$2022');
        req.user = decoded;
        next();
    } catch(ex) {
        return res.status(400).send("Invalid token.");
    }
}