(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService, FormService) {
        $rootScope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    $rootScope.user = response.data;
                    findAllUsersForAdmin();
                    findAllFormsForUser($rootScope.user);
                    $location.url("/profile/" + response.data._id);
                });
        }

        function findAllUsersForAdmin() {
            UserService.findAllUsers()
                .then(function (response) {
                    $rootScope.users = response.data;
                })
        }

        function findAllFormsForUser(user) {
            FormService.findAllFormsForUser(user._id)
                .then(function (response) {
                        $rootScope.foundForms = response.data;
                    });
        }
    }
})();