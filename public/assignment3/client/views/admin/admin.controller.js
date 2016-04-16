(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService) {
        UserService.findAllUsers(
            function (response) {
                $rootScope.users = response.data;
            }
        );

        $rootScope.adminAddAccount = adminAddAccount;
        $rootScope.adminRemoveAccount = adminRemoveAccount;
        $rootScope.adminUpdateAccount = adminUpdateAccount;
        $rootScope.adminSelectAccount = adminSelectAccount;

        var selectedAccountIndex = -1;

        function adminSelectAccount(index) {
            selectedAccountIndex = index;
            var account = $rootScope.users[index];
            $rootScope.account = {
                _id: account._id,
                firstName: account.firstName,
                lastName: account.lastName,
                username: account.username,
                password: account.password,
                email: account.email,
                roles: account.roles
            };
        }

        function adminAddAccount(account) {
            var role = account.roles.toString();
            var newAccount = {
                _id: (new Date).getTime(),
                firstName: null,
                lastName: null,
                username: account.username,
                password: account.password,
                email: null,
                roles: account.roles.split(",")
            };

            UserService.createUser(newAccount)
                .then(function (response) {
                    $rootScope.account = {};
                    $rootScope.users = response.data;
                });
        }

        function adminRemoveAccount(index) {
            var userId = $rootScope.users[index]._id;
            UserService.deleteUser(userId)
                .then(function (response) {
                    $rootScope.users = response.data;
                    $rootScope.account = {};
                });
        }

        function adminUpdateAccount(account) {
            if (selectedAccountIndex >= 0) {
                var roles;
                if (account.roles == null) {
                    roles = [];
                } else {
                    roles = account.roles.split(",");
                }
                var newAccount = {
                    _id: $rootScope.account._id,
                    firstName: $rootScope.account.firstName,
                    lastName: $rootScope.account.lastName,
                    username: account.username,
                    password: account.password,
                    email: $rootScope.account.email,
                    roles: roles
                };
                UserService.updateUser(newAccount._id, newAccount)
                    .then(function (response) {
                        $rootScope.users[selectedAccountIndex] = response.data;
                        $rootScope.account = {};
                    });
            }
        }
    }
})
();