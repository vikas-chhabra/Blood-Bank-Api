const express = require('express');
const app = express.Router();
const user = require('../controller/userController');

app.post("/signup", user.signUp)
app.post('/login', user.login);
app.delete('/:userId', user.delete);
app.get("", user.getAll);

module.exports = app;