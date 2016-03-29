(function () {
    angular
        .module("ChanceApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
        $scope.backgroundSource = 'img/cool-background.jpg';
    }
})();