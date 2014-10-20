angular.module("OverOut")
    .controller("EmployeeReportsCtrl", ["$scope", "services", function ($scope, services) {

        $scope.reportNames = [{ name: "FBS" }, { name: "PL13" }, { name: "GRIP" }];
        $scope.selectedReport = null;
        $scope.selectedCustomer = null;
        $scope.selectedObject = null;

        $scope.$on("employeeReports", function () {
            $scope.getAllEmployeeReport();
        });

        $scope.getAllEmployeeReport = function () {
            services.getAllEmployeeReports().then(function (data) {
                $scope.employeeReports = data;
                $scope.getCompanyCustomers();
            });
        };

        $scope.getCompanyCustomers = function () {
            services.getCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
            });
        };

        $scope.showCreateReportModal = function () {
            $("#myModal").modal("show");
        };

        $scope.currentCustomerSelected = function () {
            $scope.customerObjects = ($scope.selectedCustomer === null) ? [] : $scope.selectedCustomer.objects;
            $scope.showObject = ($scope.selectedCustomer === null) ? false : true;
            $scope.showReports = false;
            $scope.fbsShow = false;
            $scope.pl13Show = false;
            $scope.gripShow = false;
        };

        $scope.currentCustomerObjectSelected = function () {
            console.log($scope.selectedObject);
            $scope.showReports = ($scope.selectedObject === null) ? false : true;
            $scope.fbsShow = false;
            $scope.pl13Show = false;
            $scope.gripShow = false;
        };

        $scope.currentReportSelected = function () {

            if ($scope.selectedReport.name === "FBS") {
                $scope.fbsShow = true;
                $scope.pl13Show = false;
                $scope.gripShow = false;
            }

            if ($scope.selectedReport.name === "PL13") {
                $scope.fbsShow = false;
                $scope.pl13Show = true;
                $scope.gripShow = false;
            }

            if ($scope.selectedReport.name === "GRIP") {
                $scope.fbsShow = false;
                $scope.pl13Show = false;
                $scope.gripShow = true;
            }
        };

    }])