(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService) {
        $rootScope.update = update;

        function update(currentUser) {
            var emails;
            if (currentUser.emails == null) {
                emails = [];
            } else {
                emails = currentUser.emails.toString().replace(/ /g,"").split(",");
            }

            var phones;
            if (currentUser.phones == null) {
                phones = [];
            } else {
                phones = currentUser.phones.toString().replace(/ /g,"").split(",");
            }

            var user = {
                _id: $rootScope.user._id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                username: currentUser.username,
                password: currentUser.password,
                emails: emails,
                phones: phones,
                roles: currentUser.roles
            };

            UserService.updateUser(user._id, user)
                .then(function(response){
                    $rootScope.user = response.data;
                    if (response.data.emails != null) {
                        $rootScope.user.emails = response.data.emails.toString().replace(/,/g, ", ");
                    }
                    if (response.data.phones != null) {
                        $rootScope.user.phones = response.data.phones.toString().replace(/,/g, ", ");
                    }
                    $location.url("/profile/" + response.data._id);
                });
        }
    }
})();