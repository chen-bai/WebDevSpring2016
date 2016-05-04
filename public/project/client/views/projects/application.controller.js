(function () {
    angular
        .module("ChanceApp")
        .controller("ApplicationController", ApplicationController);

    function ApplicationController($rootScope, $location, ProjectService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.nameOrder = 0;
            $rootScope.startedOrder = 0;
            $rootScope.chargeOrder = 0;
            $rootScope.photo = "assets/img/unknown.jpg";
        }
        init();

        $rootScope.accept = accept;
        $rootScope.sort = sort;

        function accept(index){
            $rootScope.project.freelancerId = $rootScope.project.applications[index].userId;
            $rootScope.project.status = 'processing';
            ProjectService.updateProjectById($rootScope.user._id, $rootScope.project._id, $rootScope.project)
                .then(function(response){
                    $rootScope.project = {
                        _id: response.data._id,
                        userId: response.data.userId,
                        freelancerId: response.data.freelancerId,
                        title: response.data.title,
                        type: response.data.type,
                        description: response.data.description,
                        skills: response.data.toString(),
                        min: response.data.min,
                        max: response.data.max,
                        status: response.data.status,
                        started: new Date(response.data.started),
                        deadline: new Date(response.data.deadline),
                        applications: response.data.applications
                    }
                    $location.url("/project/"+$rootScope.user._id);
                })
        }

        function sort(type, order) {
            if (order == 1) {
                switch (type) {
                    case "name" :
                        $rootScope.project.applications.sort(function (a, b) {
                            if (a.username < b.username) return 1;
                            if (a.username > b.username) return -1;
                            return 0;
                        });
                        $rootScope.nameOrder = -1;
                        break;
                    case "started" :
                        $rootScope.project.applications.sort(function (a, b) {
                            if (a.started < b.started) return 1;
                            if (a.started > b.started) return -1;
                            return 0;
                        });
                        $rootScope.startedOrder = -1;
                        break;
                    case "charge" :
                        $rootScope.project.applications.sort(function (a, b) {
                            if (a.charge < b.charge) return 1;
                            if (a.charge > b.charge) return -1;
                            return 0;
                        });
                        $rootScope.chargeOrder = -1;
                        break;
                }
            } else {
                {
                    switch (type) {
                        case "name" :
                            $rootScope.project.applications.sort(function (a, b) {
                                if (a.username < b.username) return -1;
                                if (a.username > b.username) return 1;
                                return 0;
                            });
                            $rootScope.nameOrder = 1;
                            break;
                        case "started" :
                            $rootScope.project.applications.sort(function (a, b) {
                                if (a.started < b.started) return -1;
                                if (a.started > b.started) return 1;
                                return 0;
                            });
                            $rootScope.startedOrder = 1;
                            break;
                        case "charge" :
                            $rootScope.project.applications.sort(function (a, b) {
                                if (a.charge < b.charge) return -1;
                                if (a.charge > b.charge) return 1;
                                return 0;
                            });
                            $rootScope.chargeOrder = 1;
                            break;
                    }
                }
            }
        }
    }
})();