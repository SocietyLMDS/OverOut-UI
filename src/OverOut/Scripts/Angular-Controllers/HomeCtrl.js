angular.module("OverOut")
    .controller("HomeCtrl", ["$scope", "services", "$timeout", function ($scope, services, $timeout) {

        $scope.currentUser = null;
        $scope.showUserLoggedIn = false;
        $scope.showPasswordChangeError = false;
        $scope.passwordChangeErrorMessage = "";
        $scope.showChangePasswordModal = false;
        
        $scope.menus = [{ menuName: "Customers", show: false },
                        { menuName: "Employees", show: false },
                        { menuName: "Schedules", show: false },
                        { menuName: "Reports", show: false },
                        { menuName: "Profile", show: false }];
        $scope.search = { item: "" };

        $scope.changePasswordDetails = {
            userType: "",
            username: "",
            oldPassword: "",
            newPassword: "",
            retypeNewPassword: ""
        };
        
        $scope.initiate = function () {
            $scope.setupWatch();
            services.getUser().then(function (data) {
                $scope.currentUser = data;
                if ($scope.currentUser.UserType == "Company") {
                    $scope.showCompanySection = true;
                    $timeout($scope.getCurrentCompany, 200);
                    
                } else if ($scope.currentUser.UserType == "Employee") {
                    $scope.showEmployeeSection = true;
                }
            });
        };

        $scope.getCurrentCompany = function() {
            services.getCurrentCompany().then(function(data) {
                if (data === 500 || data === 401) {
                    services.logout().then(function (dataurl) {
                        window.location.href = dataurl;
                    });
                } else {
                    $scope.currentCompany = data;
                    $scope.LoggedInAs = "Logged in as " + $scope.currentCompany.Name;
                    $scope.loadSection("Customers");
                }
           });
        };

        $scope.loadSection = function (menu) {
            $scope.hideAndShowSection(menu);
            switch (menu) {
                case "Customers":
                    $scope.$broadcast("customers");
                    break;
                case "Employees":
                    $scope.$broadcast("employees");
                    break;
                case "Schedules":
                    $scope.$broadcast("schedules");
                    break;
                case "Reports":
                    $scope.$broadcast("reports");
                    break;
                case "Profile":
                    $scope.$broadcast("profile");
                    break;
            default:
            }
            
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
                $scope.userLoggedInPressed = true;
                $scope.showUserLoggedIn = true;
            } else {
                $scope.userLoggedInPressed = false;
                $scope.showUserLoggedIn = false;
            }
        };

        $scope.logout = function () {
            services.logout().then(function (data) {
                window.location.href = data;
            });
        };

        $scope.showPasswordChangeModal = function () {
            $scope.showChangePasswordModal = true;
        };

        $scope.hideChangePasswordModal = function() {
            $scope.showChangePasswordModal = false;
            $scope.showPasswordChangeError = false;
            $scope.passwordChangeErrorMessage = "";
            $scope.clearInputTexts($scope.changePasswordDetails);
        };
        
        $scope.clearInputTexts = function (object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    object[key] = "";
                }
            }
        };
        
        $scope.savePassword = function () {
            services.changePassword(angular.toJson($scope.changePasswordDetails)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.logout();
                } else if (response === "UnSucceeded") {
                    $scope.showPasswordChangeError = true;
                    $scope.passwordChangeErrorMessage = "There was a problem when changing the password, please try again";
                } else {
                    $scope.showPasswordChangeError = true;
                    $scope.passwordChangeErrorMessage = response;
                }
            });
        };
        

        $scope.setupWatch = function () {
            $scope.$watch('search.item', function (item) {
                console.log(item);
            });
        };
        
        $scope.HideUserLoggedIn = function () {
            if ($scope.showUserLoggedIn === true && !$scope.userLoggedInPressed) {
                $scope.showUserLoggedIn = false;
            }
            $scope.userLoggedInPressed = false;
        };
        

    }])