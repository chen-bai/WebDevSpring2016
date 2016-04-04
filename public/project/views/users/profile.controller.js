(function () {
    angular
        .module("ChanceApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope) {
        $rootScope.txtColor = '#555555';
        $rootScope.imageSource = 'img/black%20logo.png';
        $rootScope.update = update;

        function update() {
            //var user = {
            //    _id: $rootScope.user._id,
            //    firstName: currentUser.firstName,
            //    lastName: currentUser.lastName,
            //    username: currentUser.username,
            //    password: currentUser.password,
            //    email: currentUser.email,
            //    roles: []
            //};
            //
            //UserService.updateUser(
            //    user._id,
            //    user,
            //    function (response) {
            //        $rootScope.user = response;
            //    });
        }
    }
})();