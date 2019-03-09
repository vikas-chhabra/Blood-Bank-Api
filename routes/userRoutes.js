const express = require('express');
const app = express.Router();
const User = require('../models/User');

app.get("", (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                success: true,
                msg: "User Retrieved",
                users
            });
        })
        .catch(error => {
            res.status(422).json({
                success: false,
                msg: 'Error while retrieving user',
                error
            })
        })
})

app.post('', (req, res, body) => {
    let user = new User(req.body);
    user.save()
        .then(_ => {
            res.status(201).json({
                success: true,
                msg: 'User Created',
            });
        })
        .catch(error => {
            res.status(422).json({
                success: false,
                msg: "Error while creating user",
                error
            });
        })
});

module.exports = app;