(function () {
    angular
        .module("ChanceApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        $rootScope.logout = logout;
        $rootScope.imageSource = getImageSource();
        $rootScope.txtColor = getTxtColor();

        function getImageSource(){
            if($location.$$url=="/"){
                return 'img/logo.png';
            }else {
                return 'img/black%20logo.png';
            }
        }

        function getTxtColor() {
            if($location.$$url=="/"){
                return 'white';
            }else {
                return '#555555';
            }
        }

        function logout() {
            $rootScope.user = {};
        }
    }
})();