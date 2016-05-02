(function () {
    angular
        .module("ChanceApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $location) {
        $rootScope.$location = $location;
        $rootScope.getImage = getImage;
        $rootScope.getColor = getColor;
        $rootScope.templateStyle = "assets/css/cover.css";

        function getImage() {
            if ($location.$$url == "/") {
                return 'url(assets/img/cool-background.jpg)';
            } else {
                return 'none';
            }
        }

        function getColor() {
            if ($location.$$url == "/") {
                return '#333';
            } else {
                return '#fff';
            }
        }
    }
})();