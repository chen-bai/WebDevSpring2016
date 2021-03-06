//var uuid = require('node-uuid');
module.exports = function (app, userModel, passport, LocalStrategy) {
    passport.use('assignment', new LocalStrategy(
        function (username, password, done) {
            userModel
                .findUserByCredentials(username, password)
                .then(
                    function (users) {
                        if (!users) {
                            return done(null, false);
                        }
                        return done(null, users[0]);
                    },
                    function (err) {
                        if (err) {
                            return done(err);
                        }
                    }
                );
        }));

    var auth = authorized;

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    app.post('/api/assignment/login', passport.authenticate('assignment'), function (req, res) {
        var user = req.user;
        res.json(user);
    });

    app.get('/api/assignment/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/assignment/logout', function (req, res) {
        req.logOut();
        res.send(200);
    });

    app.post('/api/assignment/register', function (req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user.length > 0) {
                        res.json(null);
                    } else {
                        return userModel.create(newUser)
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                });
    });

    app.post('/api/assignment/account', auth, function (req, res) {
        if (isAdmin(req.user)) {
            var newAccount = req.body;
            userModel
                .findUserByUsername(newAccount.username)
                .then(
                    function (user) {
                        if (user.length == 0) {
                            return userModel.create(newAccount)
                                .then(function () {
                                        return userModel.findAll()
                                    },
                                    function (err) {
                                        res.status(400).send(err);
                                    })
                        } else {
                            return userModel.findAll()
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    })
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    });

    app.get('/api/assignment/user', auth, function (req, res) {
        if (isAdmin(req.user)) {
            userModel.findAll()
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }
    });

    app.get('/api/assignment/user/:id', function (req, res) {
        var index = req.params.id;
        userModel.findById(index)
            .then(
                function (users) {
                    res.json(users[0]);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    });

    app.get('/api/assignment/user/username/:username', function (req, res) {
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(
                function (users) {
                    res.json(users[0]);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var userId = req.params.id;
        userModel.update(userId, req.body, function (err, result) {
            if (result) {
                userModel.findById(userId)
                    .then(
                        function (users) {
                            res.json(users);
                        },
                        function (err) {
                            res.status(400).send(err);
                        })
            } else {
                res.status(400).send(err);
            }
        })
    });

    app.put('/api/assignment/account/:id', auth, function (req, res) {
        if (isAdmin(req.user)) {
            var userId = req.params.id;
            userModel.update(userId, req.body, function (err, result) {
                if (result) {
                    userModel.findById(userId)
                        .then(
                            function (users) {
                                res.json(users);
                            },
                            function (err) {
                                res.status(400).send(err);
                            })
                } else {
                    res.status(400).send(err);
                }
            })
        } else {
            res.status(403);
        }
    });

    app.delete('/api/assignment/user/:id', auth, function (req, res) {
        if (isAdmin(req.user)) {
            var id = req.params.id;
            userModel.remove(id, function (err, count) {
                if (count) {
                    userModel.findAll()
                        .then(function (users) {
                                res.json(users);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                }
                else {
                    res.status(400).send(err);
                }
            });
        } else {
            res.status(403);
        }
    });

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }
};