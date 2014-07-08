angular.module("OverOut")
    .controller("ReportsCtrl", ["$scope", "services", function ($scope, services) {

        $scope.companyReports = [];
        $scope.$on("reports", function () {

        });
    }])