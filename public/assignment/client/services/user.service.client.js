(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            registerUser: registerUser,
            createAccount: createAccount,
            deleteUser: deleteUser,
            updateUser: updateUser,
            updateAccount: updateAccount,
            login: login,
            logout: logout
        };

        return api;

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/username/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/username/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user/username/" + username + "/password/" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function registerUser(user) {
            return $http.post("/api/assignment/register", user);
        }

        function createAccount(account) {
            return $http.post("/api/assignment/account", account);
        }

        function deleteUser(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function updateAccount(userId, user) {
            return $http.put("/api/assignment/account/" + userId, user);
        }
    }
})();