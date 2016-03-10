(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        $rootScope.register = register;

        function register(user) {
            $location.url("/profile/"+user.username);
            var newUser = {
                username: user.username,
                password: user.password,
                email: user.email
            };
            UserService.createUser(
                newUser,
                function (response) {
                    $rootScope.user = response;
                });
        }
    }
})();