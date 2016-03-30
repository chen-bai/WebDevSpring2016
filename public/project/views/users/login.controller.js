(function () {
    angular
        .module("ChanceApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope){
        $rootScope.txtColor = '#555555';
        $rootScope.imageSource = 'img/black%20logo.png';
    }
    //function LoginController($rootScope, $location, UserService) {
    //    $rootScope.login = login;
    //
    //    function login(user) {
    //        UserService.findUserByCredentials(
    //            user.username,
    //            user.password,
    //            function (response) {
    //                $rootScope.user = response;
    //                $location.url("/profile/" + response._id);
    //            });
    //    }
    //}
})();