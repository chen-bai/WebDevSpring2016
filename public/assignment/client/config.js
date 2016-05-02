(function () {
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
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
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/form/:_formId/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/admin/:_id", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/forms/:_id", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkCurrentForm = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                }
                deferred.resolve();
            });

        return deferred.promise;
    };
})();
