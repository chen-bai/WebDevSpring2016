(function () {
    angular
        .module("ChanceApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/signup", {
                    templateUrl: "views/users/signup.view.html",
                    controller: "SignUpController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
