(function () {
    angular
        .module("ChanceApp")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $location, ProjectService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            getJobs();
            $rootScope.tip25 = null;
            $rootScope.tip26 = null;
            $rootScope.sort = sort;
            $rootScope.jtOrder = 0;
            $rootScope.dirOrder = 0;
            $rootScope.stOrder = 0;
            $rootScope.endOrder = 0;
            $rootScope.minOrder = 0;
            $rootScope.maxOrder = 0;
        }

        init();

        $rootScope.apply = apply;
        $rootScope.getJobDetails = getJobDetails;

        function getJobDetails(job){

        }

        function apply(job) {
            for(var i in job.applications){
                if(job.applications[i]._id == $rootScope.user._id){
                    $rootScope.tip26 = "* You have already applied for this job.";
                    $rootScope.tip25 = null;
                }
            }
            if(!$rootScope.tip26) {
                if ($rootScope.user.type == 'freelancer') {
                    if ($rootScope.user.charge) {
                        if ($rootScope.user.charge > job.max) {
                            $rootScope.tip26 = "* Your charge is too high!";
                            $rootScope.tip25 = null;
                        } else {
                            job.applications.push($rootScope.user);
                            $rootScope.tips = null;
                            ProjectService.updateProjectById(job.userId, job._id, job)
                                .then(function (response) {
                                    $rootScope.tip25 = "* Your application has been sent successfully!";
                                    $rootScope.tip26 = null;
                                })
                        }
                    } else {
                        $rootScope.tip26 = "* Please enter your charge first!";
                        $rootScope.tip25 = null;
                    }
                } else {
                    $rootScope.tip26 = "* You cannot apply for a job as a employer!";
                    $rootScope.tip25 = null;
                }
            }
        }


        function sort(type, order) {
            if (order == 1) {
                switch (type) {
                    case "title" :
                        $rootScope.jobs.sort(function (a, b) {
                            if (a.title < b.title) return 1;
                            if (a.title > b.title) return -1;
                            return 0;
                        });
                        $rootScope.jtOrder = -1;
                        break;
                    case "directory" :
                        $rootScope.jobs.sort(function (a, b) {
                            if (a.type < b.type) return 1;
                            if (a.type > b.type) return -1;
                            return 0;
                        });
                        $rootScope.dirOrder = -1;
                        break;
                    case "start" :
                        $rootScope.jobs.sort(function (a, b) {
                            if (a.started < b.started) return 1;
                            if (a.started > b.started) return -1;
                            return 0;
                        });
                        $rootScope.stOrder = -1;
                        break;
                    case "end" :
                        $rootScope.jobs.sort(function (a, b) {
                            if (a.deadline < b.deadline) return 1;
                            if (a.deadline > b.deadline) return -1;
                            return 0;
                        });
                        $rootScope.endOrder = -1;
                        break;
                    case "min" :
                        $rootScope.jobs.sort(function (a, b) {
                            if (a.min < b.min) return 1;
                            if (a.min > b.min) return -1;
                            return 0;
                        });
                        $rootScope.minOrder = -1;
                        break;
                    case "max" :
                        $rootScope.jobs.sort(function (a, b) {
                            if (a.max < b.max) return 1;
                            if (a.max > b.max) return -1;
                            return 0;
                        });
                        $rootScope.maxOrder = -1;
                        break;
                }
            } else {
                {
                    switch (type) {
                        case "title" :
                            $rootScope.jobs.sort(function (a, b) {
                                if (a.title < b.title) return -1;
                                if (a.title > b.title) return 1;
                                return 0;
                            });
                            $rootScope.jtOrder = 1;
                            break;
                        case "directory" :
                            $rootScope.jobs.sort(function (a, b) {
                                if (a.type < b.type) return -1;
                                if (a.type > b.type) return 1;
                                return 0;
                            });
                            $rootScope.dirOrder = 1;
                            break;
                        case "start" :
                            $rootScope.jobs.sort(function (a, b) {
                                if (a.started < b.started) return -1;
                                if (a.started > b.started) return 1;
                                return 0;
                            });
                            $rootScope.stOrder = 1;
                            break;
                        case "end" :
                            $rootScope.jobs.sort(function (a, b) {
                                if (a.deadline < b.deadline) return -1;
                                if (a.deadline > b.deadline) return 1;
                                return 0;
                            });
                            $rootScope.endOrder = 1;
                            break;
                        case "min" :
                            $rootScope.jobs.sort(function (a, b) {
                                if (a.min < b.min) return -1;
                                if (a.min > b.min) return 1;
                                return 0;
                            });
                            $rootScope.minOrder = 1;
                            break;
                        case "max" :
                            $rootScope.jobs.sort(function (a, b) {
                                if (a.max < b.max) return -1;
                                if (a.max > b.max) return 1;
                                return 0;
                            });
                            $rootScope.maxOrder = 1;
                            break;
                    }
                }
            }
        }

        function getJobs() {
            ProjectService.findAllJobs($rootScope.user._id)
                .then(function (response) {
                    $rootScope.jobs = response.data;
                })
        }

    }
})();