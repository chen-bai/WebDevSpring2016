(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        $rootScope.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $rootScope.user = null;
                        $location.url("/login");
                        $rootScope.foundForms = null;
                        $rootScope.users = null;
                        $rootScope.account = null;
                    },
                    function(err){
                        $rootScope.errorMessage = err;
                    });
        }
    }
})();