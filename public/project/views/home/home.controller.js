(function(){
    angular
        .module("ChanceApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope){
        $rootScope.txtColor = 'white';
        $rootScope.imageSource = 'img/logo.png';
    }
})();