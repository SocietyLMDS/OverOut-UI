angular.module("OverOut")
    .controller("RegisterCtrl", ["$scope", "services", function ($scope, services) {

        $scope.registerModel = { name: "", emailAddress: "" };
        $scope.ShowRegistrationInputs = true;

        $scope.register = function () {

            services.register(angular.toJson($scope.registerModel)).then(function (data) {
               
                var response = data.substring(1, data.length - 1);

                if (response === "Succeeded") {

                    $scope.showRegistrationComplete = true;
                    $scope.ShowRegistrationInputs = false;

                } else if (response === "UnSucceeded") {

                    $scope.showRegistrationError = true;
                    $scope.RegistrationErrorText = "Your Registration was not succeeded, please try again";

                } else {

                    $scope.showRegistrationError = true;
                    $scope.RegistrationErrorText = data.substring(1, data.length-1);
                }

            });
        };

        $scope.login = function () {

            window.location.href = "/login/index";
        };
}])

