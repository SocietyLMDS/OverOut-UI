angular.module("OverOut")
    .controller("SchedulesCtrl", ["$scope", "services", function ($scope, services) {

        $scope.companySchedules = [];
        $scope.$on("schedules", function(parameters) {

        });
    }])