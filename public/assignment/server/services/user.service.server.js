//var uuid = require('node-uuid');

module.exports = function (app, userModel) {
    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        console.log(newUser);
        userModel.create(newUser, function(err, user){
            res.json(user);
        });
    });

    app.get('/api/assignment/user', function(req,res){
        userModel.findAll(function(err, users){
            res.json(users);
        });
    });

    app.get('/api/assignment/user/:id', function(req,res){
        var index = req.params.id;
        userModel.findById(index, function(err, users){
            res.json(users[0]);
        });
    });

    app.get('/api/assignment/user/username/:username', function(req,res){
        var username = req.params.username;
        userModel.findUserByUsername(username, function(err, users){
            res.json(users[0]);
        });
    });

    app.get("/api/assignment/user/username/:username/password/:password", function(req,res){
        var username = req.params.username;
        var password = req.params.password;
        userModel.findUserByCredentials(username, password, function(err, users){
            res.json(users[0]);
        });
    });

    app.put('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        userModel.update(userId, req.body, function(err, result){
            userModel.findById(userId, function(err, user){
                res.json(user);
            })
        });
    });

    app.delete('/api/assignment/user/:id', function(req,res){
        var id = req.params.id;
        userModel.remove(id, function(err, users){
            userModel.findAll(function(err, users){
                res.json(users);
            });
        });
    })
};