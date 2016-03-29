(function () {
    angular
        .module("ChanceApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
