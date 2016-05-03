(function () {
    angular
        .module("ChanceApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope) {
        function init() {
            $rootScope.txtColor = 'white';
            $rootScope.imageSource = 'assets/img/logo.png';
            $rootScope.templateStyle = "assets/css/cover.css";
            $rootScope.errorMessage = null;
        }
        init();

        $rootScope.getLink = getLink;

        function getLink(type){
            if(!$rootScope.user){
                $rootScope.link1 = '#/login';
                $rootScope.link2 = '#/login';
            }else{
                if(type=='hire'&&$rootScope.user.type=='freelancer'){
                    $rootScope.link1 = '#/account/'+$rootScope.user._id;
                }else{
                    $rootScope.link1 = '#/search';
                }
                if(type=='work'&&$rootScope.user.type=='employer'){
                    $rootScope.link2 = '#/account/'+$rootScope.user._id;
                }else{
                    $rootScope.link1 = '#/search';
                }
            }
        }
    }
})();