(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        $rootScope.register = register;

        function register(user) {
            $location.url("/profile/"+user.username);
            var newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles
            };
            UserService.createUser(
                newUser,
                function (response) {
                    $rootScope.user = response;
                });
        }
    }
})();