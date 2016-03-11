(function () {
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile/:_id", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/form-fields/:_id", {
                    templateUrl: "views/forms/form-fields.view.html",
                    controller: "FieldsController"
                })
                .when("/admin/:_id", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms/:_id", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
