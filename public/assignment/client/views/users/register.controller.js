(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        $rootScope.register = register;

        function register(user) {
            var newUser = {
                username: user.username,
                password: user.password,
                firstName: "",
                lastName: "",
                emails: [user.emails],
                phones: [],
                roles: []
            };

            $rootScope.Username = newUser.username;

            UserService.registerUser(newUser)
                .then(function (response) {
                    $rootScope.user = response.data;
                    $location.url("/profile/" + response.data._id);
                });
        }
    }
})();