//var uuid = require('node-uuid');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel) {
    passport.use('chance', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
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
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findById(user._id)
            .then(
                function (user) {
                    done(null, user);
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

    app.post('/api/chance/login', passport.authenticate('chance'), function (req, res) {
        var user = req.user;
        userModel.loginAndUpdate(user, 'active')
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    });

    app.get('/api/chance/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/chance/logout', function (req, res) {
        userModel.findAndUpdate(req.user._id, 'offline')
            .then(
                function (user) {
                    req.logOut();
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    });

    app.post('/api/chance/register', function (req, res) {
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

    app.get('/api/chance/user/:id', function (req, res) {
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

    app.get('/api/chance/user/username/:username', function (req, res) {
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

    app.put('/api/chance/user/:id', function (req, res) {
        var userId = req.params.id;
        userModel.update(userId, req.body)
            .then(
                function (user) {
                    if (user) {
                        console.log(user);
                        userModel.findById(userId)
                            .then(
                                function (users) {
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

    app.delete('/api/chance/user/:id', function (req, res) {
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

    function isEmployer(user) {
        if (user.type === 'employer') {
            return true
        }
        return false;
    }
};