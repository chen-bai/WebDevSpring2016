(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        $rootScope.register = register;

        function register(user) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: null,
                lastName: null,
                username: user.username,
                password: user.password,
                email: user.email,
                roles: []
            };

            $rootScope.user = newUser;
            $location.url("/profile/"+newUser._id);

            UserService.createUser(
                newUser,
                function (response) {
                    $rootScope.users.push(response);
                    $rootScope.user = response;
                });
        }
    }
})();