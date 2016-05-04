(function () {
    angular
        .module("ChanceApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            registerUser: registerUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            login: login,
            logout: logout
        };

        return api;

        function logout() {
            return $http.post("/api/chance/logout");
        }

        function login(user) {
            return $http.post("/api/chance/login", user);
        }

        function findUserById(userId) {
            return $http.get("/api/chance/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/chance/user/username/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/chance/user/username/" + username + "/password/" + password);
        }

        function findAllUsers() {
            return $http.get("/api/chance/user");
        }

        function registerUser(user) {
            return $http.post("/api/chance/register", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/chance/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/chance/user/" + userId, user);
        }
    }
})();