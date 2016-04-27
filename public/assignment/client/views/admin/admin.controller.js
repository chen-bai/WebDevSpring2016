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
        $rootScope.sort = sort;
        $rootScope.usernameOrder = -1;
        $rootScope.firstOrder = -1;
        $rootScope.lastOrder = -1;


        function sort(type, order) {
            if (order < 0) {
                switch (type) {
                    case "username" :
                        $rootScope.users.sort(function (a, b) {
                            if (a.username < b.username) return -1;
                            if (a.username > b.username) return 1;
                            return 0;
                        });
                        $rootScope.usernameOrder = 1;
                        break;
                    case "first" :
                        $rootScope.users.sort(function (a, b) {
                            if (a.firstName < b.firstName) return -1;
                            if (a.firstName > b.firstName) return 1;
                            return 0;
                        });
                        $rootScope.firstOrder = 1;
                        break;
                    case "last" :
                        $rootScope.users.sort(function (a, b) {
                            if (a.lastName < b.lastName) return -1;
                            if (a.lastName > b.lastName) return 1;
                            return 0;
                        });
                        $rootScope.lastOrder = 1;
                        break;
                }
            }
            else {
                switch (type) {
                    case "username" :
                        $rootScope.users.sort(function (a, b) {
                            if (a.username < b.username) return 1;
                            if (a.username > b.username) return -1;
                            return 0;
                        });
                        $rootScope.usernameOrder = -1;
                        break;
                    case "first" :
                        $rootScope.users.sort(function (a, b) {
                            if (a.firstName < b.firstName) return 1;
                            if (a.firstName > b.firstName) return -1;
                            return 0;
                        });
                        $rootScope.firstOrder = -1;
                        break;
                    case "last" :
                        $rootScope.users.sort(function (a, b) {
                            if (a.lastName < b.lastName) return 1;
                            if (a.lastName > b.lastName) return -1;
                            return 0;
                        });
                        $rootScope.lastOrder = -1;
                        break;
                }
            }
        }

        var selectedAccountIndex = -1;

        function adminSelectAccount(index) {
            selectedAccountIndex = index;
            var account = $rootScope.users[index];
            $rootScope.account = {
                _id: account._id,
                username: account.username,
                password: account.password,
                firstName: account.firstName,
                lastName: account.lastName,
                emails: account.emails,
                phones: account.phones,
                roles: account.roles
            };
            $rootScope.tips = null;
        }

        function adminAddAccount(account) {
            if (account == null || account.username == null || account.password == null) {
                $rootScope.tips = "* Please enter username&password!";
            } else {
                var roles;
                if (account.roles == null) {
                    roles = [];
                } else {
                    roles = account.roles.toString().replace(/ /g, "").split(",");
                }

                var newAccount = {
                    username: account.username,
                    password: account.password,
                    firstName: account.firstName == null ? "" : account.firstName,
                    lastName: account.lastName == null ? "" : account.lastName,
                    emails: [],
                    phones: [],
                    roles: roles
                };

                UserService.createAccount(newAccount)
                    .then(function (response) {
                        $rootScope.account = {};
                        $rootScope.users = response.data;
                        $rootScope.tips = null;
                        selectedAccountIndex = -1;
                    });
            }
        }

        function adminRemoveAccount(index) {
            var userId = $rootScope.users[index]._id;
            UserService.deleteUser(userId)
                .then(function (response) {
                    $rootScope.users = response.data;
                    $rootScope.account = {};
                    selectedAccountIndex = -1;
                });
        }

        function adminUpdateAccount(account) {
            if (selectedAccountIndex >= 0) {
                if (account == null || account.username == null || account.password == null) {
                    $rootScope.tips = "* Please enter username&password!";
                } else {
                    var roles;
                    if (account.roles == null) {
                        roles = [];
                    } else {
                        roles = account.roles.toString().replace(/ /g, "").split(",");
                    }

                    var newAccount = {
                        _id: $rootScope.account._id,
                        username: account.username,
                        password: account.password,
                        firstName: account.firstName,
                        lastName: account.lastName,
                        emails: $rootScope.account.emails,
                        phones: $rootScope.account.phones,
                        roles: roles
                    };

                    UserService.updateUser(newAccount._id, newAccount)
                        .then(function (response) {
                            $rootScope.users[selectedAccountIndex] = response.data;
                            $rootScope.account = {};
                            $rootScope.tips = null;
                            selectedAccountIndex = -1;
                        });
                }
            } else {
                $rootScope.tips = "* Please select one account!";
            }
        }
    }
})();