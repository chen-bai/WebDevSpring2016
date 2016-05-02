(function () {
    angular
        .module("ChanceApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/dashboard.css";
            $rootScope.photo = "assets/img/unknown.jpg";
            $rootScope.tip1 = null;
            $rootScope.tip2 = null;
            $rootScope.tip3 = null;
            $rootScope.tip4 = null;
            $rootScope.tip5 = null;
            $rootScope.tip6 = null;
            $rootScope.tip7 = null;
            $rootScope.tips = null;
        }

        init();

        $rootScope.update = update;
        $rootScope.removeImage = removeImage;

        $rootScope.imageStrings = [];
        $rootScope.processFiles = function (files) {
            angular.forEach(files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $rootScope.imageStrings[i] = uri;
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };

        function removeImage() {
            $rootScope.imageStrings = [];
        }


        function update(user) {
            if (!user.email) {
                $rootScope.tip1 = "* Please enter correct email address!";
            }else{
                $rootScope.tip1 = null;
            }
            if (user.password0 != null && user.password0 != $rootScope.user.password && user.password1!=null) {
                $rootScope.tip2 = "* Wrong current password!";
            }else{
                $rootScope.tip2 = null;
            }
            if (user.password0 == null && user.password1 != null) {
                $rootScope.tip2 = "* Please enter current password!";
            }else{
                $rootScope.tip2 = null;
            }
            if (user.password1 != null && user.password1 != user.password2) {
                $rootScope.tip3 = "* New Passwords do not match!";
            }else{
                $rootScope.tip3 = null;
            }
            if (!user.firstName) {
                $rootScope.tip4 = "* Please enter your first name!";
            }else{
                $rootScope.tip4 = null;
            }
            if (!user.lastName) {
                $rootScope.tip5 = "* Please enter your last name!";
            }else{
                $rootScope.tip5 = null;
            }
            if (!user.country) {
                $rootScope.tip6 = "* Please select your country!";
            }else{
                $rootScope.tip6 = null;
            }
            if (!user.phone) {
                $rootScope.tip7 = "* Please enter your phone number!";
            }else{
                $rootScope.tip7 = null;
            }

            if (!$rootScope.tip1 && !$rootScope.tip2 && !$rootScope.tip3 &&
                !$rootScope.tip4 && !$rootScope.tip5 && !$rootScope.tip6 && !$rootScope.tip7) {
                var newUser = {
                    _id: $rootScope.user._id,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    type: $rootScope.user.type,
                    photo: $rootScope.imageStrings.length>0? $rootScope.imageStrings[0]: $rootScope.user.photo,
                    displayName: $rootScope.user.displayName,
                    headline: $rootScope.user.headline,
                    gender: user.gender ? user.gender : $rootScope.user.gender,
                    charge: $rootScope.user.charge,
                    country: user.country,
                    marital: user.marital ? user.marital : $rootScope.user.marital,
                    position: user.position ? user.position : $rootScope.user.position,
                    about: user.about ? user.about : $rootScope.user.about,
                    description: $rootScope.user.description,
                    website: user.website ? user.website : $rootScope.user.website,
                    facebook: user.facebook ? user.facebook : $rootScope.user.facebook,
                    twitter: user.twitter ? user.twitter : $rootScope.user.twitter,
                    status: $rootScope.user.status,
                    started: $rootScope.user.started
                };

                $rootScope.tip1 = null;
                $rootScope.tip2 = null;
                $rootScope.tip3 = null;
                $rootScope.tip4 = null;
                $rootScope.tip5 = null;
                $rootScope.tip6 = null;
                $rootScope.tip7 = null;

                UserService.updateUser(user._id, newUser)
                    .then(function (response) {
                        $rootScope.user = response.data;
                        $rootScope.tips="* Your profile updated successfully!";
                        $location.url("/profile/" + response.data._id);
                    });
            }else{
                $rootScope.tips = null;
            }
        }

    }
})();