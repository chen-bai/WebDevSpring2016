(function () {
    angular
        .module("ChanceApp")
        .controller("JobController", JobController);

    function JobController($rootScope, $location, ProjectService, UserService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.sort = sort;
            $rootScope.titleOrder = 0;
            $rootScope.deadlineOrder = 0;
            $rootScope.startedOrder = 0;
            $rootScope.date = new Date();
            $rootScope.tips = null;
            $rootScope.job = {};
            $rootScope.employer = {};
        }
        init();

        function sort(type, order) {
            if (order == 1) {
                switch (type) {
                    case "title" :
                        $rootScope.myJobs.sort(function (a, b) {
                            if (a.title < b.title) return 1;
                            if (a.title > b.title) return -1;
                            return 0;
                        });
                        $rootScope.titleOrder = -1;
                        break;
                    case "started" :
                        $rootScope.myJobs.sort(function (a, b) {
                            if (a.started < b.started) return 1;
                            if (a.started > b.started) return -1;
                            return 0;
                        });
                        $rootScope.startedOrder = -1;
                        break;
                    case "deadline" :
                        $rootScope.myJobs.sort(function (a, b) {
                            if (a.deadline < b.deadline) return 1;
                            if (a.deadline > b.deadline) return -1;
                            return 0;
                        });
                        $rootScope.deadlineOrder = -1;
                        break;
                }
            } else {
                {
                    switch (type) {
                        case "title" :
                            $rootScope.myJobs.sort(function (a, b) {
                                if (a.title < b.title) return -1;
                                if (a.title > b.title) return 1;
                                return 0;
                            });
                            $rootScope.titleOrder = 1;
                            break;
                        case "started" :
                            $rootScope.myJobs.sort(function (a, b) {
                                if (a.started < b.started) return -1;
                                if (a.started > b.started) return 1;
                                return 0;
                            });
                            $rootScope.startedOrder = 1;
                            break;
                        case "deadline" :
                            $rootScope.myJobs.sort(function (a, b) {
                                if (a.deadline < b.deadline) return -1;
                                if (a.deadline > b.deadline) return 1;
                                return 0;
                            });
                            $rootScope.deadlineOrder = 1;
                            break;
                    }
                }
            }
        }

        ProjectService.findAllJobsForUser($rootScope.user._id)
            .then(function (response) {
                $rootScope.myJobs = response.data;
            });

        $rootScope.viewJob = viewJob;

        function viewJob(index) {
            var charge = 0;
            var job = $rootScope.myJobs[index];
            for(var i in $rootScope.myJobs[index].applications){
                if($rootScope.myJobs[index].applications[i]._id==$rootScope.user._id){
                    charge = $rootScope.myJobs[index].applications[i].charge;
                }
            }
            $rootScope.job = {
                _id: job._id,
                userId: job.userId,
                freelancerId: job.userId,
                title: job.title,
                type: job.type,
                description: job.description,
                skills: job.skills.toString().replace(",", " ,"),
                charge: charge,
                status: job.status,
                started: new Date(job.started),
                deadline: new Date(job.deadline)
            };
            UserService.findUserById(job.userId)
                .then(function(response){
                    $rootScope.employer = response.data;
                });
            $location.url("/jobDetails/"+job._id);
        }
    }
})();