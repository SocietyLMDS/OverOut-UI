angular.module("OverOut")
    .controller("HomeCtrl", ["$scope", "services", function ($scope, services) {

        $scope.currentUser = null;
        $scope.showUserLoggedIn = false;
        
        $scope.menus = [{ menuName: "Customers", show: false },
                        { menuName: "Employees", show: false },
                        { menuName: "Schedules", show: false },
                        { menuName: "Reports", show: false },
                        { menuName: "Profile", show: false }];
        $scope.search = { item: "" };
        
        $scope.initiate = function () {
            $scope.setupWatch();
            services.getUser().then(function (data) {
                $scope.currentUser = data;
                if ($scope.currentUser.UserType == "Company") {
                    $scope.showCompanySection = true;
                    $scope.loadSection("Customers");
                    $scope.getCurrentCompany();
                } else if ($scope.currentUser.UserType == "Employee") {
                    $scope.showEmployeeSection = true;
                }
            });
        };

        $scope.getCurrentCompany = function() {
            services.getCurrentCompany().then(function(data) {
                $scope.currentCompany = data;
                $scope.LoggedInAs = "Logged in as " + $scope.currentCompany.Name;

            });
        };

        $scope.loadSection = function (menu) {
            $scope.hideAndShowSection(menu);
        };

        $scope.hideAndShowSection = function (menu) {
            for (var i = 0; i < $scope.menus.length; i++) {
                var currentMenu = $scope.menus[i].menuName;
                if (currentMenu.indexOf(menu) != -1) {
                    $scope.menus[i].show = true;
                } else {
                    $scope.menus[i].show = false;
                }
            }
        };

        $scope.userLoggedInInfo = function () {
            if ($scope.showUserLoggedIn === false) {
                $scope.showUserLoggedIn = true;
            } else {
                $scope.showUserLoggedIn = false;
            }
        };

        $scope.logout = function () {
            console.log("logout");
        };

        $scope.changePassword = function () {
            console.log("change");
        };

        $scope.setupWatch = function () {
            $scope.$watch('search.item', function (item) {
                console.log(item);
            });
        };
    }])