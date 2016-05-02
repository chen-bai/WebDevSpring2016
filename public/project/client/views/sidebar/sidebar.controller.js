(function () {
    angular
        .module("ChanceApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $location, UserService) {
        $rootScope.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $rootScope.user = null;
                        $location.url("/login");
                        $rootScope.projects = null;
                        $rootScope.currentUser = null;
                        $rootScope.user = null;
                        $rootScope.txtColor = 'white';
                        $rootScope.imageSource = 'assets/img/logo.png';
                        $rootScope.templateStyle = 'assets/css/cover.css';
                    },
                    function(err){
                        $rootScope.errorMessage = err;
                    });
        }
    }
})();