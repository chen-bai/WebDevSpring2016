(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        $rootScope.update = update;

        function update(currentUser) {
            var user = {
                _id: $rootScope.user._id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                username: currentUser.username,
                password: currentUser.password,
                email: currentUser.email,
                roles: []
            };

            UserService.updateUser(user._id, user)
                .then(function(response){
                    $rootScope.user = response.data;
                });
        }
    }
})();