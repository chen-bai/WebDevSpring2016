(function () {
    angular
        .module("ChanceApp")
        .controller("PublishController", PublishController);

    function PublishController($rootScope, $location, ProjectService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.tip8 = null;
            $rootScope.tip9 = null;
            $rootScope.tip10 = null;
            $rootScope.tip11 = null;
            $rootScope.tip12 = null;
            $rootScope.tip13 = null;
            $rootScope.tip14 = null;
            $rootScope.tip15 = null;
            $rootScope.tips = null;
            $rootScope.date = new Date();
            $rootScope.project = null;
        }

        init();

        $rootScope.postProject = postProject;
        $rootScope.saveProject = saveProject;

        function saveProject(project) {
            if (project) {
                if (!project.type) {
                    $rootScope.tip8 = "* Please select a project type.";
                }else{
                    $rootScope.tip8 = null;
                }
                if (!project.title) {
                    $rootScope.tip9 = "* Please enter a project title.";
                }else{
                    $rootScope.tip9 = null;
                }
                if (!project.skills) {
                    $rootScope.tip10 = "* Please enter skills required by project.";
                }else{
                    $rootScope.tip10 = null;
                }
                if (!project.description) {
                    $rootScope.tip11 = "* Please enter project description.";
                }else{
                    $rootScope.tip11 = null;
                }
                if (!project.min && !project.max) {
                    $rootScope.tip12 = "* Please enter a whole number of USD.";
                    $rootScope.tip13 = "* Please enter a whole number of USD.";
                }
                if (!project.min && project.max) {
                    $rootScope.tip12 = "* Please enter minimum budget(USD/hr).";
                    $rootScope.tip13 = null;
                }
                if (project.min && !project.max) {
                    $rootScope.tip12 = null;
                    $rootScope.tip13 = "* Please enter maximum budget(USD/hr).";
                }
                if (project.min && project.max && project.min >= project.max) {
                    $rootScope.tip12 = "* The minimum bid should be less than or equal to the maximum bid.";
                    $rootScope.tip13 = "* The maximum bid should be greater than or equal to the minimum bid.";
                }
                if (project.min && project.max && project.min < project.max){
                    $rootScope.tip12 = null;
                    $rootScope.tip13 = null;
                }
                if (!project.started && !project.deadline) {
                    $rootScope.tip14 = "* Please enter project start time.";
                    $rootScope.tip15 = "* Please enter project end time.";
                }
                if (!project.started && !project.deadline) {
                    $rootScope.tip14 = "* Please enter project start time.";
                    $rootScope.tip15 = null;
                }
                if (project.started && !project.deadline) {
                    $rootScope.tip14 = null;
                    $rootScope.tip15 = "* Please enter project end time.";
                }
                if (project.started && project.deadline && project.started >= project.deadline) {
                    $rootScope.tip14 = "* The project start time must be earlier than end time.";
                    $rootScope.tip15 = "* The project end time must be later than start time.";
                }
                if (project.started && project.deadline && project.started < project.deadline){
                    $rootScope.tip14 = null;
                    $rootScope.tip15 = null;
                }

                if (!$rootScope.tip8 && !$rootScope.tip9 && !$rootScope.tip10 && !$rootScope.tip11 &&
                    !$rootScope.tip12 && !$rootScope.tip13 && !$rootScope.tip14 && !$rootScope.tip15) {
                    var skills = project.skills.toString().replace(/ /g, "").split(",");
                    project.skills = skills;
                    project.status = 'editing';
                    project.freelancerId = null;
                    project.applications = [];
                    ProjectService.createProjectForUser($rootScope.user._id, project)
                        .then(function (response) {
                            $rootScope.projects = response.data;
                            $rootScope.tips = null;
                            $location.url("/project/" + $rootScope.user._id);
                        });
                }
            }
            else {
                $rootScope.tips = "* Please enter the required information about your project."
            }
        }

        function postProject(project) {
            if (project) {
                if (!project.type) {
                    $rootScope.tip8 = "* Please select a project type.";
                }else{
                    $rootScope.tip8 = null;
                }
                if (!project.title) {
                    $rootScope.tip9 = "* Please enter a project title.";
                }else{
                    $rootScope.tip9 = null;
                }
                if (!project.skills) {
                    $rootScope.tip10 = "* Please enter skills required by project.";
                }else{
                    $rootScope.tip10 = null;
                }
                if (!project.description) {
                    $rootScope.tip11 = "* Please enter project description.";
                }else{
                    $rootScope.tip11 = null;
                }
                if (!project.min && !project.max) {
                    $rootScope.tip12 = "* Please enter a whole number of USD.";
                    $rootScope.tip13 = "* Please enter a whole number of USD.";
                }
                if (!project.min && project.max) {
                    $rootScope.tip12 = "* Please enter minimum budget(USD/hr).";
                    $rootScope.tip13 = null;
                }
                if (project.min && !project.max) {
                    $rootScope.tip12 = null;
                    $rootScope.tip13 = "* Please enter maximum budget(USD/hr).";
                }
                if (project.min && project.max && project.min >= project.max) {
                    $rootScope.tip12 = "* The minimum bid should be less than or equal to the maximum bid.";
                    $rootScope.tip13 = "* The maximum bid should be greater than or equal to the minimum bid.";
                }
                if (project.min && project.max && project.min < project.max){
                    $rootScope.tip12 = null;
                    $rootScope.tip13 = null;
                }
                if (!project.started && !project.deadline) {
                    $rootScope.tip14 = "* Please enter project start time.";
                    $rootScope.tip15 = "* Please enter project end time.";
                }
                if (!project.started && !project.deadline) {
                    $rootScope.tip14 = "* Please enter project start time.";
                    $rootScope.tip15 = null;
                }
                if (project.started && !project.deadline) {
                    $rootScope.tip14 = null;
                    $rootScope.tip15 = "* Please enter project end time.";
                }
                if (project.started && project.deadline && project.started >= project.deadline) {
                    $rootScope.tip14 = "* The project start time must be earlier than end time.";
                    $rootScope.tip15 = "* The project end time must be later than start time.";
                }
                if (project.started && project.deadline && project.started < project.deadline){
                    $rootScope.tip14 = null;
                    $rootScope.tip15 = null;
                }

                if (!$rootScope.tip8 && !$rootScope.tip9 && !$rootScope.tip10 && !$rootScope.tip11 &&
                    !$rootScope.tip12 && !$rootScope.tip13 && !$rootScope.tip14 && !$rootScope.tip15) {
                    var skills = project.skills.toString().replace(/ /g, "").split(",");
                    project.skills = skills;
                    project.freelancerId = null;
                    project.applications = [];
                    ProjectService.createProjectForUser($rootScope.user._id, project)
                        .then(function (response) {
                            $rootScope.projects = response.data;
                            $rootScope.tips = null;
                            $location.url("/project/" + $rootScope.user._id);
                        });
                }
            }
            else {
                $rootScope.tips = "* Please enter the required information about your project."
            }
        }
    }
})();