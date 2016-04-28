//var users = require("./user.mock.json");

module.exports = function (db, mongoose) {
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

    function findUserByCredentials(username, password) {
        return UserModel.find({$and: [{username: username}, {password: password}]});
    }

    function findUserByUsername(username) {
        return UserModel.find({username: username});
    }

    function findById(userId) {
        return UserModel.findById(userId);
    }

    function findAll() {
        return UserModel.find();
    }

    function create(user) {
        return UserModel.create(user);
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
            phones: user.phones,
            roles: user.roles
        }, callback)
    }
};