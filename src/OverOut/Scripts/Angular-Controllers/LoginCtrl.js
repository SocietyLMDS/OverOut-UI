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

            services.Login($scope.loginModel.username, $scope.loginModel.password).then(function (data) {

                if (data === 401 || data === 500 ) {

                    $scope.showLoginFailedMessage = true;
                    
                } else {

                    //$scope.userDetails.id = data.id;
                    //$scope.userDetails.companyId = data.companyId;
                    //$scope.userDetails.companyName = data.companyName;
                    //$scope.userDetails.userType = data.userType;
                    //$scope.userDetails.firstname = data.firstname;
                    //$scope.userDetails.lastname = data.lastname;
                    //$scope.userDetails.emailAddress = data.emailAddress;
                }
            });
        };

        $scope.forgotPassword = function () {

            console.log("Forgot");
        };

        $scope.register = function () {
            
            location.href = '/Register/index';
        };
    }])