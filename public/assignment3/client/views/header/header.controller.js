(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        $rootScope.logout = logout;

        function logout() {
            $rootScope.user = {};
            $rootScope.foundForms = [];
            $rootScope.users = [];
        }
    }
})();