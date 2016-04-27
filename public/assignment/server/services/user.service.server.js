//var uuid = require('node-uuid');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel) {
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findById(user._id)
            .then(
                function (users) {
                    done(null, users[0]);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    app.post('/api/assignment/login', passport.authenticate('local'), function (req, res) {
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
                    if (user) {
                        res.json(null);
                    } else {
                        userModel.create(newUser)
                            .then(function (user) {
                                    res.json(user);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
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
                }
            );
    });

    app.post('/api/assignment/account', function (req, res) {
        var newAccount = req.body;
        userModel
            .findUserByUsername(newAccount.username)
            .then(
                function (users) {
                    if (users == null) {
                        res.json(null);
                    } else {
                        userModel.create(newAccount);
                        userModel.findAll()
                            .then(function (users) {
                                    res.json(users);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    });

    app.get('/api/assignment/user', function (req, res) {
        userModel.findAll()
            .then(function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                });
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

    app.get("/api/assignment/user/username/:username/password/:password", function (req, res) {
        var username = req.params.username;
        var password = req.params.password;
        userModel.findUserByCredentials(username, password)
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

    app.delete('/api/assignment/user/:id', function (req, res) {
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
    });
}
;