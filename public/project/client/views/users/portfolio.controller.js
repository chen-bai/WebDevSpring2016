(function () {
    angular
        .module("ChanceApp")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController($rootScope, $location, UserService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.mode = "edit";
            $rootScope.mode1 = "view";
            $rootScope.mode2 = "view";
            $rootScope.mode3 = "view";
            $rootScope.mode4 = "view";
            $rootScope.btnText = "Edit Profile";
        }

        init();


        $rootScope.changeStatus = changeStatus;
        $rootScope.changeStatus1 = changeStatus1;
        $rootScope.changeStatus2 = changeStatus2;
        $rootScope.changeStatus3 = changeStatus3;
        $rootScope.changeStatus4 = changeStatus4;

        function changeStatus(user) {
            if ($rootScope.mode == 'edit') {
                $rootScope.mode = "view";
                $rootScope.mode1 = "edit";
                $rootScope.mode2 = "edit";
                $rootScope.mode3 = "edit";
                $rootScope.mode4 = "edit";
                $rootScope.btnText = "View Profile";
            } else {
                $rootScope.mode = "edit";
                $rootScope.mode1 = "view";
                $rootScope.mode2 = "view";
                $rootScope.mode3 = "view";
                $rootScope.mode4 = "view";
                $rootScope.btnText = "Edit Profile";

                if (!user.displayName) {
                    $rootScope.user.displayName = user.displayName;
                }
                if (!user.headline) {
                    $rootScope.user.headline = user.headline;
                }
                if (!user.description) {
                    $rootScope.user.description = user.description;
                }
                if (!user.charge) {
                    $rootScope.user.charge = user.charge;
                }

                UserService.updateUser(user._id, $rootScope.user)
                    .then(function (response) {
                        $rootScope.user = response.data;
                        $location.url("/portfolio/" + response.data._id);
                    });
            }
        }

        function changeStatus1() {
            $rootScope.mode1 = "editing";
        }

        function changeStatus2() {
            $rootScope.mode2 = "editing";
        }

        function changeStatus3() {
            $rootScope.mode3 = "editing";
        }

        function changeStatus4() {
            $rootScope.mode4 = "editing";
        }


    }
})();