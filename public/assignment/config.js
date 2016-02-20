(function () {
    angular
        .config(function ($routeProvider) {
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
