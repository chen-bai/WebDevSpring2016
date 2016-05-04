(function () {
    angular
        .module("ChanceApp")
        .controller("JobDetailController", JobDetailController);

    function JobDetailController($rootScope, $location, ProjectService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.photo = "assets/img/unknown.jpg";
            $rootScope.date = new Date();
            $rootScope.tips = null;
        }
        init();

        $rootScope.complete = complete;

        function complete(job){
            ProjectService.completeJobById(job._id)
                .then(function (response) {
                    $rootScope.job = {};
                    $location.url("/job/"+$rootScope.user._id);
                })
        }
    }
})();