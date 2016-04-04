var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findAll: findAll,
        findById: findById,
        create: create,
        remove: remove,
        update: update,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }

    return api;

    function findUserByCredentials(username, password) {
        var user;
        for (var i in users) {
            if (users[i].username == username && users[i].password == password) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findUserByUsername(username) {
        var user;
        for (var i in users) {
            if (users[i].username == username) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findById(userId) {
        var user;
        for (var i in users) {
            if (users[i]._id == userId) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findAll() {
        return users;
    }

    function create(user) {
        users.push(user);
        return users;
    }

    function remove(userId) {
        var index;
        for (var i in users) {
            if (users[i]._id == userId) {
                index = i;
                break;
            }
        }
        users.splice(index, 1);
        return users;
    }

    function update(userId, user) {
        for (var i in users) {
            if (users[i]._id == userId) {
                users[i] = user;
                break;
            }
        }
        return user;
    }
};