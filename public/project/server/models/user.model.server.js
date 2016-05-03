//var users = require("./user.mock.json");

module.exports = function (db, mongoose) {
    var ChancerSchema = require("./user.schema.server.js")(mongoose);
    var ChancerModel = mongoose.model('Chancer', ChancerSchema);

    var api = {
        findAll: findAll,
        findById: findById,
        findAndUpdate: findAndUpdate,
        create: create,
        remove: remove,
        update: update,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserByCredentials(username, password) {
        return ChancerModel.find({$and: [{username: username}, {password: password}]});
    }

    function findUserByUsername(username) {
        return ChancerModel.find({username: username});
    }

    function findById(userId) {
        return ChancerModel.findById(userId);
    }

    function findAll() {
        return ChancerModel.find();
    }

    function create(user) {
        return ChancerModel.create(user);
    }

    function remove(userId, callback) {
        ChancerModel.remove({_id: userId}, callback);
    }

    function findAndUpdate(userId, status){
        return ChancerModel.findOneAndUpdate({_id:userId},{status: status});
    }

    function update(userId, user) {
        return ChancerModel.findOneAndUpdate({_id: userId}, {
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