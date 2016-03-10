(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        $rootScope.login = login;

        function login(user) {

            UserService.findUserByCredentials(
                user.username,
                user.password,
                function (response) {
                    $rootScope.user = response;
                    $location.url("/profile/" + response._id);
                });
        }
    }
})();