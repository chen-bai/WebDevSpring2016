(function () {
    angular
        .module("ChanceApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/signup", {
                    templateUrl: "views/users/signup.view.html",
                    controller: "SignUpController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/profile/:_userId", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/publish/:_userId", {
                    templateUrl: "views/projects/publish.view.html",
                    controller: "PublishController",
                    resolve: {
                        loggedin: checkEmployer
                    }
                })
                .when("/project/:_userId", {
                    templateUrl: "views/projects/projects.view.html",
                    controller: "ProjectController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/details/:_projectId", {
                    templateUrl: "views/projects/details.view.html",
                    controller: "DetailsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/portfolio/:_userId", {
                    templateUrl: "views/users/portfolio.view.html",
                    controller: "PortfolioController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                //.when("/account/:_userId", {
                //    templateUrl: "views/users/account.view.html",
                //    controller: "AccountController",
                //    resolve: {
                //        loggedin: checkLoggedin
                //    }
                //})
                .when("/application/:_projectId", {
                    templateUrl: "views/projects/application.view.html",
                    controller: "ApplicationController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/jobs", {
                    templateUrl: "views/search/jobs.view.html",
                    controller: "JobsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    var checkEmployer= function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/chance/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0' && user.type === 'employer')
                {
                    $rootScope.user = user;
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
            });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, ProjectService)
    {
        var deferred = $q.defer();

        $http.get('/api/chance/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                    $rootScope.currentUser = user;
                    ProjectService.findAllProjectsForUser(user.userId)
                        .then(function (response) {
                            $rootScope.projects = response.data;
                        });
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $rootScope.errorMessage = '* You need to log in.';
                    $rootScope.currentUser = null;
                    deferred.reject();
                    $location.url('/login');
                }
            });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/chance/loggedin')
            .success(function(user) {
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                    $rootScope.currentUser = null;
                }
                deferred.resolve();
            });

        return deferred.promise;
    };
})();
