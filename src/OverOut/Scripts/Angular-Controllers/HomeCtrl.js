angular.module("OverOut")
    .controller("HomeCtrl", ["$scope", "services", function ($scope, services) {

        $scope.currentUser = null;

        $scope.GetUser = function () {

            services.GetUser().then(function (data) {

                $scope.currentUser = data;

                if ($scope.currentUser.UserType == "Company") {

                    $scope.setupCompany();

                } else if ($scope.currentUser.UserType == "Employee") {

                    $scope.setupEmployee();
                }
            });
        };

        $scope.setupCompany = function () {
            $scope.showCompanySection = true;
            $scope.getCurrentCompany();
        };

        $scope.getCurrentCompany = function () {
            services.getCurrentCompany().then(function (data) {
                $scope.currentCompany = data;
                console.log($scope.currentCompany);
                $scope.GetCompanyEmployees();
            });
        };

        $scope.GetCompanyEmployees = function () {
            services.GetCompanyEmployees().then(function (data) {
                $scope.companyEmployess = data;
                console.log($scope.companyEmployess);
                $scope.GetCompanyCustomers();
            });
        };

        $scope.GetCompanyCustomers = function () {
            services.GetCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
                console.log($scope.companyCustomers);
                $scope.GetCompanyReports();
            });

        };

        $scope.GetCompanyReports = function () {
            services.GetCompanyReports().then(function (data) {
                $scope.companyReports = data;
                console.log($scope.companyReports);
                $scope.GetCompanySchedules();
            });
        };

        $scope.GetCompanySchedules = function () {
            services.GetCompanySchedules().then(function (data) {
                $scope.companySchedules = data;
                console.log($scope.companySchedules);
            });
        };

        $scope.setupEmployee = function () {

            $scope.showEmployeeSection = true;
        };

    }])