//var users = require("./user.mock.json");

module.exports = function (db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('Chancer', UserSchema);

    var api = {
        findAll: findAll,
        findById: findById,
        findAndUpdate: findAndUpdate,
        create: create,
        remove: remove,
        update: update,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        loginAndUpdate: loginAndUpdate
    };

    return api;

    function findUserByCredentials(username, password) {
        return UserModel.find({$and: [{username: username}, {password: password}]});
    }

    function loginAndUpdate(user, status) {
        return UserModel.findOneAndUpdate(
            {$and: [{username: user.username}, {password: user.password}]},
            {status: status});
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

    function findAndUpdate(userId, status) {
        return UserModel.findOneAndUpdate({_id: userId}, {status: status});
    }

    function update(userId, user) {
        return UserModel.findOneAndUpdate({_id: userId}, {
            _id: user._id,
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            type: user.type,
            photo: user.photo,
            displayName: user.displayName,
            headline: user.headline,
            gender: user.gender,
            charge: user.charge,
            country: user.country,
            marital: user.marital,
            position: user.position,
            about: user.about,
            description: user.description,
            website: user.website,
            facebook: user.facebook,
            twitter: user.twitter,
            status: user.status,
            started: user.started
        });
    }
};