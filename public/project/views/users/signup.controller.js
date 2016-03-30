(function () {
    angular
        .module("ChanceApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($rootScope) {
        $rootScope.txtColor = '#555555';
        $rootScope.imageSource = 'img/black%20logo.png';
        $rootScope.signUp = signUp();

        function signUp() {
            //var newUser = {
            //    _id: (new Date).getTime(),
            //    firstName: null,
            //    lastName: null,
            //    username: user.username,
            //    password: user.password,
            //    email: user.email,
            //    roles: []
            //};
            //
            //$rootScope.user = newUser;
            //$location.url("/profile/"+newUser._id);
            //
            //UserService.createUser(
            //    newUser,
            //    function (response) {
            //        $rootScope.users.push(response);
            //        $rootScope.user = response;
            //    });
        }
    }
})();