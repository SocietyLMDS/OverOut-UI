angular.module("OverOut")
    .controller("ForgotPasswordCtrl", ["$scope","services", function($scope, services) {

        $scope.forgotPasswordModel = { emailAddress : "" };
        $scope.ShowForgotPasswordInputs = true;

        $scope.forgotPassword = function() {

            console.log($scope.forgotPasswordModel.emailAddress);

            services.forgotPassword(angular.toJson($scope.forgotPasswordModel)).then(function(data) {

                console.log(data);

                var response = data.substring(1, data.length - 1);

                if (response === "Succeeded") {

                    $scope.showForgotPasswordComplete = true;
                    $scope.ShowForgotPasswordInputs = false;
                    
                }else if (response === "UnSucceeded") {

                    $scope.showForgotPasswordError = true;
                    $scope.forgotPasswordErrorText = "Your email address could not be found, Please try again";
                    
                } else {
                    
                    $scope.showForgotPasswordError = true;
                    $scope.forgotPasswordErrorText = response;
                }
            });
        };

        $scope.login = function() {

            window.location.href = "/login/index";
        };

    }]);