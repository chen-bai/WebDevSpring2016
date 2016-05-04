(function () {
    angular
        .module("ChanceApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($rootScope, ProjectService) {
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
        }
        init();

        function sort(type, order) {
            if (order == 1) {
                switch (type) {
                    case "title" :
                        $rootScope.projects.sort(function (a, b) {
                            if (a.title < b.title) return 1;
                            if (a.title > b.title) return -1;
                            return 0;
                        });
                        $rootScope.titleOrder = -1;
                        break;
                    case "started" :
                        $rootScope.projects.sort(function (a, b) {
                            if (a.started < b.started) return 1;
                            if (a.started > b.started) return -1;
                            return 0;
                        });
                        $rootScope.startedOrder = -1;
                        break;
                    case "deadline" :
                        $rootScope.projects.sort(function (a, b) {
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
                            $rootScope.projects.sort(function (a, b) {
                                if (a.title < b.title) return -1;
                                if (a.title > b.title) return 1;
                                return 0;
                            });
                            $rootScope.titleOrder = 1;
                            break;
                        case "started" :
                            $rootScope.projects.sort(function (a, b) {
                                if (a.started < b.started) return -1;
                                if (a.started > b.started) return 1;
                                return 0;
                            });
                            $rootScope.startedOrder = 1;
                            break;
                        case "deadline" :
                            $rootScope.projects.sort(function (a, b) {
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

        var userId = $rootScope.user._id;
        var selectedProjectIndex = -1;
        $rootScope.project = {};

        ProjectService.findAllProjectsForUser(userId)
            .then(function (response) {
                $rootScope.projects = response.data;
            });

        //$rootScope.addProject = addProject;
        $rootScope.clearProject = clearProject;
        $rootScope.updateProject = updateProject;
        $rootScope.deleteProject = deleteProject;
        $rootScope.selectProject = selectProject;

        if (selectedProjectIndex == -1) {
            $rootScope.linkStyle = "linkDisabled";
        }

        function selectProject(index) {
            selectedProjectIndex = index;
            var project = $rootScope.projects[index];
            $rootScope.project = {
                _id: project._id,
                userId: userId,
                freelancerId: null,
                title: project.title,
                type: project.type,
                description: project.description,
                skills: project.skills? project.skills.toString() : project.skills,
                min: project.min,
                max: project.max,
                status: project.status,
                started: new Date(project.started),
                deadline: new Date(project.deadline),
                applications: project.applications
            };
            $rootScope.linkStyle = "";
        }

        function updateProject(project) {
            if (selectedProjectIndex >= 0 && project.status == 'editing') {
                if(project.started >= project.deadline){
                    $rootScope.tips = "* The project start time must be earlier than end time."
                }else {
                    var newProject = {
                        _id: project._id,
                        userId: userId,
                        freelancerId: null,
                        title: project.title,
                        type: project.type,
                        description: project.type,
                        skills: project.skills,
                        min: project.min,
                        max: project.max,
                        status: project.status,
                        started: project.started,
                        deadline: project.deadline,
                        applications: project.applications
                    };
                    ProjectService.updateProjectById(userId, newProject._id, newProject)
                        .then(function (response) {
                            ProjectService.findAllProjectsForUser(userId)
                                .then(function (response) {
                                    $rootScope.projects = response.data;
                                });
                            $rootScope.project = {};
                            $rootScope.tips = null;
                            $rootScope.linkStyle = "linkDisabled";
                        })
                }
            }else{
                $rootScope.tips = "* Project only can be modified under editing status.";
            }
        }

        function deleteProject(index) {
            if ($rootScope.projects[index].status != 'processing') {
                var projectId = $rootScope.projects[index]._id;
                ProjectService.deleteProjectById(userId, projectId)
                    .then(function (response) {
                        $rootScope.projects.splice(index, 1);
                        $rootScope.project = {};
                        $rootScope.linkStyle = "linkDisabled";
                        $rootScope.tips = null;
                    })
            }else {
                $rootScope.tips = "* Project cannot be deleted under processing status";
            }
        }

        function clearProject(){
            $rootScope.project = {};
            $rootScope.linkStyle = "linkDisabled";
        }
    }
})();