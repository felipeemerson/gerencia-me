const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

require('./startup/validation')();

const users = require('./routes/users');
const types = require('./routes/types');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}

const db = config.get('db');

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log(`Connected to ${db}...`));

const app = express();

app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.use('/api/users', users);
app.use('/api/types', types);
app.use('/api/tasks', tasks);
app.use('/api/auth', auth);

const port = process.env.PORT || 5001;

const server = app.listen(port, console.log(`Listening on port ${port}...`));

module.exports = server;