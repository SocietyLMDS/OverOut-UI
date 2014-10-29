angular.module('OverOut')
    .controller('EmployeeProfileCtrl', ['$scope', 'services', function ($scope, services) {

        $scope.$on("EmployeeProfiles", function () {
            $scope.getCurrentEmployee();
        });

        $scope.getCurrentEmployee = function () {
            services.getCurrentEmployee().then(function (data) {
                console.log(data);
                $scope.currentEmployee = data;
            });
        };
    }])