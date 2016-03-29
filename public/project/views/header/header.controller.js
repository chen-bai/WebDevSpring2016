(function () {
    angular
        .module("ChanceApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        $rootScope.imageSource = "img/logo.png";
        $rootScope.logout = logout;

        function logout() {
            $rootScope.user = {};
        }
    }
})();