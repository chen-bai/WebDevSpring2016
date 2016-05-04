(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService, FormService) {
        $rootScope.login = login;

        function login(user) {
            if(user){
                UserService
                    .login(user)
                    .then(
                        function(response){
                            $rootScope.user = response.data;
                            findAllFormsForUser($rootScope.user);
                            $location.url("/profile/" + response.data._id);
                        },
                        function(err){
                            $rootScope.error = err;
                        }
                    )
            }
        }

        function findAllFormsForUser(user) {
            FormService.findAllFormsForUser(user._id)
                .then(function (response) {
                        $rootScope.foundForms = response.data;
                    });
        }
    }
})();