//var users = require("./user.mock.json");

module.exports = function (mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findAll: findAll,
        findById: findById,
        create: create,
        remove: remove,
        update: update,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserByCredentials(username, password, callback) {
        UserModel.find({$and: [{username: username}, {password: password}]}, callback);
    }

    function findUserByUsername(username, callback) {
        UserModel.find({username: username}, callback);
    }

    function findById(userId, callback) {
        UserModel.findById(userId, callback);
    }

    function findAll(callback) {
        UserModel.find(callback);
    }

    function create(user, callback) {
        UserModel.create(user, callback);
    }

    function remove(userId, callback) {
        UserModel.remove({_id: userId}, callback);
    }

    function update(userId, user, callback) {
        UserModel.findOneAndUpdate({_id: userId}, {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            emails: user.emails,
            phones: user.phones
        }, callback)
    }
};