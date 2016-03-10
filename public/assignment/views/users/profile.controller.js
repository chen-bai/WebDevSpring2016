(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService){
        $rootScope.update = update;
        function update(user){
            UserService.updateUser(
                user,
                function (response) {
                $rootScope.user = response;
            });
        }
    }
})();