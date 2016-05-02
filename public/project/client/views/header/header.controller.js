(function () {
    angular
        .module("ChanceApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        $rootScope.logout = logout;
        $rootScope.imageSource = getImageSource;
        $rootScope.txtColor = getTxtColor;
        $rootScope.getLink = getLink;
        $rootScope.logout = logout;


        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $rootScope.user = null;
                        $rootScope.tips = null;
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

        function getLink(){
            if(!$rootScope.user){
                $rootScope.link= '#/login';
            }else{
                $rootScope.link= '#/publish/'+$rootScope.user._id;
                $rootScope.currentUser = $rootScope.user;
            }
        }

        function getImageSource(){
            if($location.$$url=="/"){
                return 'assets/img/logo.png';
            }else {
                return 'assets/img/black%20logo.png';
            }
        }

        function getTxtColor() {
            if($location.$$url=="/"){
                return 'white';
            }else {
                return '#555555';
            }
        }
    }
})();