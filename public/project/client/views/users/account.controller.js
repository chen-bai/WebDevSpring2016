(function () {
    angular
        .module("ChanceApp")
        .controller("AccountController", AccountController);

    function AccountController($rootScope, $location, UserService, ProjectService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.tip24 = null;
        }
        init();
        $rootScope.userType = null;
        $rootScope.update = update;
        $rootScope.close = close;

        function close(){
            ProjectService.findAllProcessingProjectsForUser($rootScope.user._id)
                .then(function(response) {
                    if (response.data.length > 0) {
                        $rootScope.tip24 = "* You must complete your processing projects before you close this account!"
                    } else{
                        UserService.deleteUser($rootScope.user._id)
                            .then(function(response){
                                $rootScope.currentUser = null;
                                $rootScope.user = null;
                                $location.url("#/signup");
                            })
                    }
                })
        }

        function update(user){
            $rootScope.user.type = user.type;
            UserService.updateUser(user._id, $rootScope.user)
                .then(function (response) {
                    $rootScope.user = response.data;
                    $rootScope.tip24 = "Your account type updated successfully!";
                    $location.url("/account/" + response.data._id);
                });
        }
    }
})();