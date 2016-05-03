(function () {
    angular
        .module("ChanceApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService, ProjectService) {
        function init(){
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/cover.css";
            $rootScope.tips=null;
        }
        init();

        $rootScope.login = login;

        function login(user) {
            if (!user || !user.username || !user.password) {
                $rootScope.tips = "* Please enter username & password";
            } else {
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            $rootScope.user = response.data;
                            $rootScope.currentUser = response.data;
                            findAllProjectsForUser($rootScope.user);
                            $rootScope.tips = null;
                            $location.url("/profile/" + response.data._id);
                        },
                        function (err) {
                            $rootScope.tips = "* User not found!";
                        }
                    )
            }
        }

        function findAllProjectsForUser(user) {
            ProjectService.findAllProjectsForUser(user._id)
                .then(function (response) {
                    $rootScope.projects = response.data;
                });
        }
    }
})();