angular.module("OverOut")
    .controller("EmployeeSchedulesCtrl", ["$scope", "services", "$rootScope", function ($scope, services, $rootScope) {
        
        $scope.employeeStatuses = ["Confirm", "Sick", "Unavailable"];

        $scope.$on("employeeSchedules", function () {
            $scope.getEmployeeShifts();
        });

        $scope.getEmployeeShifts = function () {
            services.getEmployeeShifts().then(function (data) {
                $scope.employeeShifts = $scope.convertTime(data);
            });
        };

        $scope.convertTime = function (data) {

            for (var i = 0; i < data.length; i++) {

                var currentSchedule = data[i];
                var startTime = moment(currentSchedule.StartTime);
                var endTime = moment(currentSchedule.EndTime);
                currentSchedule.StartTime = startTime.format("dddd, MMMM Do YYYY, HH:mm:ss");
                currentSchedule.EndTime = endTime.format("dddd, MMMM Do YYYY, HH:mm:ss");
                currentSchedule.radioBoxes = [];

                for (var j = 0; j < $scope.employeeStatuses.length; j++) {

                    var userChoice = null;
                    if (currentSchedule.Status === "Confirmed") userChoice = 1;
                    if (currentSchedule.Status === "Sick") userChoice = 2;
                    if (currentSchedule.Status === "Unavailable") userChoice = 3;
                    var radioBox = { id: j + 1, text: $scope.employeeStatuses[j] };
                    currentSchedule.radioBoxes.push(radioBox);
                    currentSchedule.userChoice = userChoice;
                }

            }
           
            return data;
        };

        $scope.radioBoxSelected = function (currentSchedule) {
            var status = $scope.employeeStatuses[currentSchedule.userChoice - 1];
            currentSchedule.Status = (status === "Confirm") ? "Confirmed" : status;
            services.setEmployeeShiftStatus(angular.toJson(currentSchedule)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response == "Succeeded") {
                } else if (response == "UnSucceeded") {
                } else {
                }
            });
        };
    }])