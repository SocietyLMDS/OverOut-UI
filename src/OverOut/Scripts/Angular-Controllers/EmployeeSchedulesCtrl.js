angular.module('OverOut')
    .controller('EmployeeSchedulesCtrl', ['$scope', 'services', function ($scope, services) {
        $scope.$on('employeeSchedules', function () {
            $scope.getEmployeeShifts();
        });

        $scope.getEmployeeShifts = function () {
            services.getEmployeeShifts().then(function (data) {
                $scope.employeeShifts = $scope.convertTime(data);
                console.log($scope.employeeShifts);
            });
        };

        $scope.convertTime = function (data) {
            for (var i = 0; i < data.length; i++) {
                var currentSchedule = data[i];
                var startTime = moment(currentSchedule.StartTime);
                var endTime = moment(currentSchedule.EndTime);
                currentSchedule.StartTime = startTime.format("dddd, MMMM Do YYYY, HH:mm:ss");
                currentSchedule.EndTime = endTime.format("dddd, MMMM Do YYYY, HH:mm:ss");
            }
            return data;
        };
    }])