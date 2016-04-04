var uuid = require('node-uuid');

module.exports = function (app, userModel) {
    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        newUser._id = uuid.v1();
        res.json(userModel.create(newUser));
    });

    app.get('/api/assignment/user', function(req,res){
      res.json(userModel.findAll());
    });

    app.get('/api/assignment/user/:id', function(req,res){
        var index = req.params.id;
        res.json(userModel.findById(index));
    });

    app.get('/api/assignment/user/username/:username', function(req,res){
        var username = req.params.username;
        res.json(userModel.findUserByUsername(username));
    });

    app.get("/api/assignment/user/username/:username/password/:password", function(req,res){
        var username = req.params.username;
        var password = req.params.password;
        res.json(userModel.findUserByCredentials(username, password));
    });

    app.put('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        res.json(userModel.update(userId, req.body));
    });

    app.delete('/api/assignment/user/:id', function(req,res){
        var index = req.params.id;
        res.json(userModel.remove(index));
    })
};