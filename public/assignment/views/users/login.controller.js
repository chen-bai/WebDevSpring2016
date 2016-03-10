(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService) {
        $rootScope.login = login;
        var user = $rootScope.user;

        $location.url("/profile/"+user.username);
        UserService.findUserByCredentials(
            user.username,
            user.password,
            function (response) {
                $rootScope.user = response;
            });
    }
})();