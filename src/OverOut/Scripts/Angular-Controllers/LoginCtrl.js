angular.module("OverOut")
    .controller("LoginCtrl", ["$scope", "services", function ($scope, services) {

        $scope.loginModel = { username: "", password: "" };
        $scope.showUsernameErrorMessage = false;
        $scope.showPasswordErrorMessage = false;
        $scope.showLoginFailedMessage = false;

        $scope.login = function () {

            if ($scope.loginModel.username === "" && $scope.loginModel.password === "") {

                $scope.showUsernameErrorMessage = true;
                $scope.showPasswordErrorMessage = true;
                $scope.showLoginFailedMessage = false;
                return;

            } else if ($scope.loginModel.username === "") {

                $scope.showPasswordErrorMessage = false;
                $scope.showLoginFailedMessage = false;
                $scope.showUsernameErrorMessage = true;
                return;

            } else if ($scope.loginModel.password === "") {

                $scope.showUsernameErrorMessage = false;
                $scope.showLoginFailedMessage = false;
                $scope.showPasswordErrorMessage = true;
                return;
            }

            $scope.showUsernameErrorMessage = false;
            $scope.showPasswordErrorMessage = false;

            services.login($scope.loginModel.username, $scope.loginModel.password).then(function (data) {

                if (data === 401 || data === 500) {

                    $scope.showLoginFailedMessage = true;

                } else {
                    
                    $scope.userDetails.id = data.Id;
                    $scope.userDetails.companyId = data.CompanyId;
                    $scope.userDetails.companyName = data.CompanyName;
                    $scope.userDetails.userType = data.UserType;
                    $scope.userDetails.firstname = data.Firstname;
                    $scope.userDetails.lastname = data.Lastname;
                    $scope.userDetails.emailAddress = data.EmailAddress;
                    window.location.href = data.RedirectTo;
                }
            });
        };

        $scope.forgotPassword = function () {

            window.location.href = "/ForgotPassword/index";
        };

        $scope.register = function () {
            
            window.location.href = "/Register/index";
        };
    }])