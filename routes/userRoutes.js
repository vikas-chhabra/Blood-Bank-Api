const express = require('express');
const app = express.Router();
const user = require('../controller/userController');

app.get("", user.getAll);
app.post("/signup", user.signUp)
app.post('/login', user.login);

module.exports = app;