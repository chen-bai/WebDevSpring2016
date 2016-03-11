(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        $rootScope.logout = logout;
        $rootScope.showUser = showUser;

        function logout() {
            $rootScope.user = {};
        }

        function showUser() {

        }
    }
})();