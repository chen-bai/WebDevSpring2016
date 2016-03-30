(function () {
    angular
        .module("ChanceApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
        $scope.getImage = getImage;
        $scope.getColor = getColor;

        console.log(getImage());
        function getImage(){
            if($location.$$url=="/"){
                return 'url(img/cool-background.jpg)';
            }else{
                return 'none';
            }
        }

        function getColor(){
            if($location.$$url=="/"){
                return '#333';
            }else{
                return '#eee';
            }
        }
    }
})();