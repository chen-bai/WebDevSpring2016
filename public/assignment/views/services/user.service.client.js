(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [{
            "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
            "username": "alice", "password": "alice", "roles": ["student"]
        },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            var user;
            for (var i in users) {
                if (users[i].username == username && users[i].password == password) {
                    user = users[i];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var newuser = {
                _id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                roles: user.roles
            };
            users.push(newuser);
            callback(newuser);
        }

        function deleteUser(userId, callback) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    callback(users[i]);
                    break;
                }
            }
        }
    }
})();