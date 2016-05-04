(function () {
    angular
        .module("ChanceApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($rootScope, $location, UserService) {
        function init() {
            $rootScope.txtColor = '#555555';
            $rootScope.imageSource = 'assets/img/black%20logo.png';
            $rootScope.templateStyle = "assets/css/cover.css";
            $rootScope.signUp = signUp;
            $rootScope.tis
        }
        init();

        function signUp(user) {
            if (!user) {
                $rootScope.tips = "* Please enter required fields!";
            } else {
                if (!user.email) {
                    $rootScope.tips = "* Please enter correct email address!";
                } else {
                    if (!user.username || !user.password || !user.password2) {
                        $rootScope.tips = "* Please enter username & password!";
                    } else {
                        if (user.password != user.password2) {
                            $rootScope.tips = "* Passwords do not match!";
                        } else {
                            if (!user.type) {
                                $rootScope.tips = "* Please select your account type!";
                            } else {
                                var newUser = {
                                    username: user.username,
                                    password: user.password,
                                    email: user.email,
                                    firstName: "",
                                    lastName: "",
                                    phone: "",
                                    type: user.type,
                                    displayName: "",
                                    headline: "",
                                    gender: "",
                                    charge: null,
                                    birthday: null,
                                    country: "",
                                    marital: "",
                                    position: "",
                                    about: "",
                                    description: "",
                                    website: "",
                                    facebook: "",
                                    twitter: ""
                                };
                                UserService.registerUser(newUser)
                                    .then(function (response) {
                                        if(!response.data){
                                            $rootScope.tips = "* This username already exists!";
                                        }else {
                                            $rootScope.user = response.data;
                                            $rootScope.currentUser = response.data;
                                            $location.url("/profile/" + response.data._id);
                                        }
                                    });
                            }
                        }
                    }
                }
            }
        }
    }
})();