const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAll = (req, res) => {
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
}

exports.signUp = (req, res) => {
    if (req.body.email) {
        User.find({
                email: req.body.email.trim()
            })
            .then(user => {
                if (user.length >= 1) {
                    res.status(409).json({
                        success: false,
                        msg: "User already exist"
                    });
                } else {
                    bcrypt.hash(req.body.password, 12, (error, hash) => {
                        if (error) {
                            return res.status(422).json({
                                success: false,
                                error
                            });
                        } else {
                            const user = new User({
                                userName: req.body.userName,
                                email: req.body.email.trim(),
                                password: hash
                            });
                            user.save()
                                .then(_ => {
                                    res.status(201).json({
                                        success: true,
                                        msg: 'User Created'
                                    });
                                })
                                .catch(error => {
                                    res.status({
                                        success: false,
                                        msg: 'Error while creating user',
                                        error
                                    });
                                });
                        }
                    })
                }
            })
            .catch(error => {
                res.status(422).json({
                    success: false,
                    error
                })
            })
    } else {
        res.status(422).json({
            success: false,
            msg: 'Enter the email'
        })
    }
}

exports.login = (req, res) => {
    User.findOne({
            email: req.body.email.trim(),
        })
        .then(user => {
            if (user.length > 1) {
                return res.status(401).json({
                    success: false,
                    msg: 'Auth failed'
                });
            } else if (user.active) {
                bcrypt.compare(req.body.password, user.password, function (error, result) {
                    if (error) {
                        return res.status(401).json({
                            success: false,
                            msg: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email.trim(),
                            userId: user._id
                        }, '412i34bkgi241ug34iu1g24iu21giuhbnh2v1i4', {
                            expiresIn: '1d'
                        });
                        return res.status(200).json({
                            success: true,
                            msg: 'Auth successful',
                            token
                        });
                    } else {
                        res.status(401).json({
                            success: false,
                            msg: 'Auth failed',
                        })
                    }
                })
            } else {
                res.status(401).json({
                    success: false,
                    msg: 'You have been blocked',
                })
            }
        })
        .catch(_ => {
            res.status(401).json({
                success: false,
                msg: 'Auth failed'
            })
        })
}

exports.delete = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (user.length > 1) {
                return res.status(401).json({
                    success: false,
                    msg: 'Auth failed'
                });
            } else {
                User.findByIdAndUpdate(req.params.userId, {
                        active: !user.active
                    })
                    .then(_ => {
                        res.status(200).json({
                            success: true,
                            msg: 'User Inactive'
                        });
                    }).catch(_ => {
                        res.status(401).json({
                            success: false,
                            msg: 'User not Found'
                        })
                    })

            }
        })
        .catch(_ => {
            res.status(401).json({
                success: false,
                msg: 'Auth failed'
            })
        })
}