angular.module('OverOut')
    .controller('EmployeeSchedulesCtrl', ['$scope', 'services', function ($scope, services) {
        $scope.$on('employeeSchedules', function () {
            $scope.getEmployeeSchedules();
        });

        $scope.getEmployeeSchedules = function() {
            services.getEmployeeSchedules().then(function(data) {
                $scope.employeeSchedules = data;
            });
        };
    }])