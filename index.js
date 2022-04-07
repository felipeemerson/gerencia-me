const express = require('express');
const mongoose = require('mongoose');

require('./startup/validation')();

const users = require('./routes/users');
const types = require('./routes/types');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');


const db = "mongodb://localhost/gerencia-me";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log(`Connected to ${db}...`));

const app = express();

app.use(express.json());

app.use('/api/users', users);
app.use('/api/types', types);
app.use('/api/tasks', tasks);
app.use('/api/auth', auth);

const port = process.env.PORT || 5001;

const server = app.listen(port, console.log(`Listening on port ${port}...`));

module.exports = server;