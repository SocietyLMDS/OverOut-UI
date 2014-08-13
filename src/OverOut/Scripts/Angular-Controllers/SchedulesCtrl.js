angular.module("OverOut")
    .controller("SchedulesCtrl", ["$scope", "services", function ($scope, services) {
        $scope.$on("schedules", function() {
            $scope.getCompanySchedules();
        });

        $scope.getCompanySchedules = function() {
            services.getCompanySchedules().then(function(data) {
                $scope.companySchedules = data;
            });
        };

        $scope.CreateSchedule = function() {
            console.log("schedules");
        };
    }])