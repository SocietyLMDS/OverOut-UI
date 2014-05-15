angular.module('OverOut')
    .controller('LoginCtrl', ['$scope', 'services', function ($scope, services) {

        $scope.loginModel = { username: '', password: '' };
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
            var encodedstring = 'basic ' + btoa($scope.loginModel.username + ':' + $scope.loginModel.password);

            services.Login(encodedstring).then(function (data) {

                if (data == 401) {

                    $scope.showLoginFailedMessage = true;
                    
                } else {

                    $scope.userDetails.id = data.Id;
                    $scope.userDetails.companyId = data.companyId;
                    $scope.userDetails.companyName = data.CompnayName;
                    $scope.userDetails.UserType = data.UserType;
                    $scope.userDetails.firstname = data.Firstname;
                    $scope.userDetails.lastname = data.Lastname;
                    $scope.userDetails.emailAddress = data.emailAddress;
                    $scope.userDetails.userBasicAuth = encodedstring;
                    $scope.userDetails.userAuthorised = true;
                }
            });
        };

        $scope.forgotPassword = function () {

            console.log("Forgot");
        };

        $scope.register = function () {
            console.log("Register");
        };
    }])