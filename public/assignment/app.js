(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home.view.html"
                })
                .when("/profile", {
                    templateUrl: "profile.view.html"
                })
                .when("/admin", {
                    templateUrl: "admin.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();