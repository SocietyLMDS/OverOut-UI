angular.module("OverOut")
    .controller("HomeCtrl", ["$scope", "services", function ($scope, services) {

        $scope.currentUser = null;
        $scope.showUserLoggedIn = false;
        $scope.showcustomerAddingError = false;
        $scope.customerAddingErrorMessage = "Error adding a new customer";
        $scope.customerAddOrEditMessage = "";

        $scope.menus = [{ menuName: "Customers", show:false},
                        { menuName: "Employees", show: false },
                        { menuName: "Schedules", show: false },
                        { menuName: "Reports", show: false },
                        { menuName: "Profile", show: false }];
        $scope.search = { item: "" };
        $scope.customerDetails = {
            id:"",
            companyId: "",
            name: "",
            organisationNumber: "",
            visitationAddress: {street : "", postcode:""},
            postalAddress: { street: "", postcode: "" },
            emailAddress: "",
            phoneNumber: "",
            mobileNumber: "",
            faxNumber: "",
            managerFirstname: "",
            managerLastname: "",
        };

        $scope.initiate = function () {
            $scope.setupWatch();
            services.getUser().then(function (data) {
                $scope.currentUser = data;
                if ($scope.currentUser.UserType == "Company") {
                    $scope.showCompanySection = true;
                    $scope.getCurrentCompany();
                } else if ($scope.currentUser.UserType == "Employee") {
                    $scope.showEmployeeSection = true;
                }
            });
        };

        $scope.loadSection = function (menu) {
            $scope.hideAndShowSection(menu);
            switch (menu) {
                case "Customers":
                    $scope.getCompanyCustomers();
                    break;
                case "Employees":
                    $scope.getCompanyEmployees();
                    break;
                case "Schedules":
                    $scope.getCompanySchedules();
                    break;
                case "Reports":
                    $scope.getCompanyReports();
                    break;
                case "Profile":
                    $scope.profile();
                    break;
                default:
            }
        };
        
        $scope.hideAndShowSection = function(menu) {
            for (var i = 0; i < $scope.menus.length; i++) {
                var currentMenu = $scope.menus[i].menuName;
                if (currentMenu.indexOf(menu) != -1) {
                    $scope.menus[i].show = true;
                } else {
                    $scope.menus[i].show = false;
                }
            }
        };
        
        $scope.getCurrentCompany = function () {
            services.getCurrentCompany().then(function (data) {
                $scope.currentCompany = data;
                $scope.LoggedInAs = "Logged in as " + $scope.currentCompany.Name;
                $scope.loadSection("Customers");
            });
        };

        $scope.getCompanyCustomers = function () {
            services.getCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
                console.log($scope.companyCustomers);
            });
        };

        $scope.getCompanyEmployees = function () {
            services.getCompanyEmployees().then(function (data) {
                $scope.companyEmployess = data;
            });
        };

        $scope.getCompanySchedules = function () {
            services.getCompanySchedules().then(function (data) {
                $scope.companySchedules = data;
            });
        };

        $scope.getCompanyReports = function () {
            services.getCompanyReports().then(function (data) {
                $scope.companyReports = data;
            });
        };

        $scope.profile = function() {
            console.log($scope.currentCompany, "profile");
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

        $scope.showAddCustomerModal = function () {
            $scope.customerAddOrEditMessage = "Add Customer";
            $scope.showCustomerModal = true;
            $scope.showCustomerModalContent = true;
        };

        $scope.hideCustomerModal = function () {
            
            $scope.showCustomerModal = false;
            $scope.showCustomerModalContent = false;
            $scope.showcustomerAddingError = false;
            $scope.customerAddingErrorMessage = "";
            
            for (var key in $scope.customerDetails) {
                if ($scope.customerDetails.hasOwnProperty(key)) {
                    if (key == "visitationAddress" || key == "postalAddress") {
                        $scope.customerDetails[key] = {street : "", postcode:"" };
                    } else {
                        $scope.customerDetails[key] = "";
                    }
                }
            }
        };

        $scope.saveCustomer = function() {
            if ($scope.customerAddOrEditMessage === "Add Customer") {
                $scope.addCustomer();
            } else {
                $scope.editCustomer();
            }
        };

        $scope.addCustomer = function () {
            services.addCustomer(angular.toJson($scope.customerDetails)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.showcustomerAddingError = false;
                    $scope.customerAddingErrorMessage = "";
                    $scope.getCompanyCustomers();
                    $scope.hideCustomerModal();
                } else if (response == "UnSucceeded") {
                    $scope.showcustomerAddingError = true;
                    $scope.customerAddingErrorMessage = "There was a problem when adding the customer, please try again";
                } else {
                    $scope.showcustomerAddingError = true;
                    $scope.customerAddingErrorMessage = response;
                }
            });
        };

        $scope.editCustomer = function() {

        };

        $scope.showEditCustomer = function(customer) {
            $scope.customerDetails = {
                id: customer.id,
                companyId: customer.companyId,
                name: customer.name,
                organisationNumber: customer.organisationNumber,
                visitationAddress: { street: customer.visitationAddress.street, postcode: customer.visitationAddress.postcode },
                postalAddress: { street: customer.postalAddress.street, postcode: customer.postalAddress.postcode },
                emailAddress: customer.emailAddress,
                phoneNumber: customer.phoneNumber,
                mobileNumber: customer.mobileNumber,
                faxNumber: customer.faxNumber,
                managerFirstname: customer.managerFirstname,
                managerLastname: customer.managerLastname,
            };
            $scope.customerAddOrEditMessage = "Edit Customer";
            $scope.showCustomerModal = true;
            $scope.showCustomerModalContent = true;
        };

        $scope.deleteCustomer = function(customer) {
            console.log(customer);
        };

        $scope.addObject = function() {

        };
    }])