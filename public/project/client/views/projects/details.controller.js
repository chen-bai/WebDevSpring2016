(function () {
    angular
        .module("ChanceApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope, ProjectService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.tip16 = null;
            $rootScope.tip17 = null;
            $rootScope.tip18 = null;
            $rootScope.tip19 = null;
            $rootScope.tip20 = null;
            $rootScope.tip21 = null;
            $rootScope.tip22 = null;
            $rootScope.tip23 = null;
            $rootScope.tipSuccess = null;
            $rootScope.tipBanned = null;
            $rootScope.date = new Date();
        }

        init();

        $rootScope.updateProject = updateProject;
        $rootScope.postProject = postProject;

        function postProject(project) {
            if (project.status != 'editing') {
                $rootScope.tipBanned = "* This project has already been posted!";
                $rootScope.tipSuccess = null;
            } else {
                if (project) {
                    if (!project.type) {
                        $rootScope.tip16 = "* Please select a project type.";
                    } else {
                        $rootScope.tip16 = null;
                    }
                    if (!project.title) {
                        $rootScope.tip17 = "* Please enter a project title.";
                    } else {
                        $rootScope.tip17 = null;
                    }
                    if (!project.skills) {
                        $rootScope.tip18 = "* Please enter skills required by project.";
                    } else {
                        $rootScope.tip18 = null;
                    }
                    if (!project.description) {
                        $rootScope.tip19 = "* Please enter project description.";
                    } else {
                        $rootScope.tip19 = null;
                    }
                    if (!project.min && !project.max) {
                        $rootScope.tip20 = "* Please enter a whole number of USD.";
                        $rootScope.tip21 = "* Please enter a whole number of USD.";
                    }
                    if (!project.min && project.max) {
                        $rootScope.tip20 = "* Please enter minimum budget(USD/hr).";
                        $rootScope.tip21 = null;
                    }
                    if (project.min && !project.max) {
                        $rootScope.tip20 = null;
                        $rootScope.tip21 = "* Please enter maximum budget(USD/hr).";
                    }
                    if (project.min && project.max && project.min >= project.max) {
                        $rootScope.tip20 = "* The minimum bid should be less than or equal to the maximum bid.";
                        $rootScope.tip21 = "* The maximum bid should be greater than or equal to the minimum bid.";
                    }
                    if (project.min && project.max && project.min < project.max) {
                        $rootScope.tip20 = null;
                        $rootScope.tip21 = null;
                    }
                    if (!project.started && !project.deadline) {
                        $rootScope.tip22 = "* Please enter project start time.";
                        $rootScope.tip23 = "* Please enter project end time.";
                    }
                    if (!project.started && !project.deadline) {
                        $rootScope.tip22 = "* Please enter project start time.";
                        $rootScope.tip23 = null;
                    }
                    if (project.started && !project.deadline) {
                        $rootScope.tip22 = null;
                        $rootScope.tip23 = "* Please enter project end time.";
                    }
                    if (project.started && project.deadline && project.started >= project.deadline) {
                        $rootScope.tip22 = "* The project start time must be earlier than end time.";
                        $rootScope.tip23 = "* The project end time must be later than start time.";
                    }
                    if (project.started && project.deadline && project.started < project.deadline) {
                        $rootScope.tip22 = null;
                        $rootScope.tip23 = null;
                    }

                    if (!$rootScope.tip16 && !$rootScope.tip17 && !$rootScope.tip18 && !$rootScope.tip19 &&
                        !$rootScope.tip20 && !$rootScope.tip21 && !$rootScope.tip22 && !$rootScope.tip23) {
                        var skills = project.skills.toString().replace(/ /g, "").split(",");
                        project.skills = skills;
                        project.status = 'published';
                        project.applications = [];
                        ProjectService.updateProjectById($rootScope.user._id, project._id, project)
                            .then(function (response) {
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
                                $rootScope.tipSuccess = "* Your project posted successfully!";
                                $rootScope.tipBanned = null;
                            });
                    }
                } else {
                    $rootScope.tipBanned = "* Please enter the required information about your project.";
                    $rootScope.tipSuccess = null;
                }
            }
        }

        function updateProject(project) {
            if (project.status != 'editing') {
                $rootScope.tipBanned = "* Project only can be modified under editing status.";
                $rootScope.tipSuccess = null;
            } else {
                if (project) {
                    if (!project.type) {
                        $rootScope.tip16 = "* Please select a project type.";
                    } else {
                        $rootScope.tip16 = null;
                    }
                    if (!project.title) {
                        $rootScope.tip17 = "* Please enter a project title.";
                    } else {
                        $rootScope.tip17 = null;
                    }
                    if (!project.skills) {
                        $rootScope.tip18 = "* Please enter skills required by project.";
                    } else {
                        $rootScope.tip18 = null;
                    }
                    if (!project.description) {
                        $rootScope.tip19 = "* Please enter project description.";
                    } else {
                        $rootScope.tip19 = null;
                    }
                    if (!project.min && !project.max) {
                        $rootScope.tip20 = "* Please enter a whole number of USD.";
                        $rootScope.tip21 = "* Please enter a whole number of USD.";
                    }
                    if (!project.min && project.max) {
                        $rootScope.tip20 = "* Please enter minimum budget(USD/hr).";
                        $rootScope.tip21 = null;
                    }
                    if (project.min && !project.max) {
                        $rootScope.tip20 = null;
                        $rootScope.tip21 = "* Please enter maximum budget(USD/hr).";
                    }
                    if (project.min && project.max && project.min >= project.max) {
                        $rootScope.tip20 = "* The minimum bid should be less than or equal to the maximum bid.";
                        $rootScope.tip21 = "* The maximum bid should be greater than or equal to the minimum bid.";
                    }
                    if (project.min && project.max && project.min < project.max) {
                        $rootScope.tip20 = null;
                        $rootScope.tip21 = null;
                    }
                    if (!project.started && !project.deadline) {
                        $rootScope.tip22 = "* Please enter project start time.";
                        $rootScope.tip23 = "* Please enter project end time.";
                    }
                    if (!project.started && !project.deadline) {
                        $rootScope.tip22 = "* Please enter project start time.";
                        $rootScope.tip23 = null;
                    }
                    if (project.started && !project.deadline) {
                        $rootScope.tip22 = null;
                        $rootScope.tip23 = "* Please enter project end time.";
                    }
                    if (project.started && project.deadline && project.started >= project.deadline) {
                        $rootScope.tip22 = "* The project start time must be earlier than end time.";
                        $rootScope.tip23 = "* The project end time must be later than start time.";
                    }
                    if (project.started && project.deadline && project.started < project.deadline) {
                        $rootScope.tip22 = null;
                        $rootScope.tip23 = null;
                    }

                    if (!$rootScope.tip16 && !$rootScope.tip17 && !$rootScope.tip18 && !$rootScope.tip19 &&
                        !$rootScope.tip20 && !$rootScope.tip21 && !$rootScope.tip22 && !$rootScope.tip23) {
                        var skills = project.skills.toString().replace(/ /g, "").split(",");
                        project.skills = skills;
                        project.applications = [];
                        ProjectService.updateProjectById($rootScope.user._id, project._id, project)
                            .then(function (response) {
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
                                };
                                $rootScope.tipSuccess = "* Your project updated successfully!";
                                $rootScope.tipBanned = null;
                            });
                    }
                }
                else {
                    $rootScope.tipBanned = "* Please enter the required information about your project.";
                    $rootScope.tipSuccess = null;
                }
            }
        }
    }
})();