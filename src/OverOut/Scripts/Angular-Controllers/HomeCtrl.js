angular.module("OverOut")
    .controller("HomeCtrl", ["$scope", "services", function ($scope, services) {

        $scope.currentUser = null;
        $scope.showUserLoggedIn = false;
        $scope.currentCustomer = null;
        
        //add edit customer
        $scope.showcustomerAddingError = false;
        $scope.customerAddingErrorMessage = "";
        $scope.customerAddOrEditMessage = "";

        //add edit customer object
        $scope.showCustomerObjectModalContent = false;
        $scope.showcustomerObjectAddingError = false;
        $scope.customerObjectAddingErrorMessage = "";
        $scope.customerObjectAddOrEditMessage = "";

        $scope.menus = [{ menuName: "Customers", show: false },
                        { menuName: "Employees", show: false },
                        { menuName: "Schedules", show: false },
                        { menuName: "Reports", show: false },
                        { menuName: "Profile", show: false }];
        $scope.search = { item: "" };
        
        $scope.customerDetails = {
            id: "",
            companyId: "",
            name: "",
            organisationNumber: "",
            visitationAddress: { street: "", postcode: "" },
            postalAddress: { street: "", postcode: "" },
            emailAddress: "",
            phoneNumber: "",
            mobileNumber: "",
            faxNumber: "",
            managerFirstname: "",
            managerLastname: "",
        };

        $scope.customerObjectDetails = {
            id: "",
            customerId: "",
            companyId: "",
            name: "",
            visitationAddress: { street: "", postcode: "" },
            responsibleGuardFirstname: "",
            responsibleGuardLastname: "",
            responsibleManagerFistname: "",
            responsibleManagerLastname: "",
            licenseType: "",
            license: "",
            hourlyRate: "",
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

        $scope.profile = function () {
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
            $scope.showCustomerObjectModalContent = false;
            $scope.showcustomerObjectAddingError = false;
            $scope.customerObjectAddingErrorMessage = "";
            $scope.clearInputTexts($scope.customerDetails);
            $scope.clearInputTexts($scope.customerObjectDetails);
        };

        $scope.clearInputTexts = function(object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    if (key == "visitationAddress" || key == "postalAddress") {
                        object[key] = { street: "", postcode: "" };
                    } else {
                        object[key] = "";
                    }
                }
            }
        };

        $scope.saveCustomer = function () {
            if ($scope.customerAddOrEditMessage === "Add Customer") {
                $scope.addCustomer();
            } else {
                $scope.modifyCustomer();
            }
        };

        $scope.addCustomer = function () {
            services.addCustomer(angular.toJson($scope.customerDetails)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.hideCustomerModal();
                    setTimeout($scope.getCompanyCustomers, 500);
                } else if (response == "UnSucceeded") {
                    $scope.showcustomerAddingError = true;
                    $scope.customerAddingErrorMessage = "There was a problem when adding the customer, please try again";
                } else {
                    $scope.showcustomerAddingError = true;
                    $scope.customerAddingErrorMessage = response;
                }
            });
        };

        $scope.modifyCustomer = function () {
            services.modifyCustomer(angular.toJson($scope.customerDetails)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.hideCustomerModal();
                    setTimeout($scope.getCompanyCustomers, 500);
                } else if (response === "UnSucceeded") {
                    $scope.showcustomerAddingError = true;
                    $scope.customerAddingErrorMessage = "There was a problem when adding the customer, please try again";
                } else {
                    $scope.showcustomerAddingError = true;
                    $scope.customerAddingErrorMessage = response;
                }
            });
        };

        $scope.showEditCustomer = function (customer) {
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

        $scope.deleteCustomer = function (customer) {
            var cofirmResponse = confirm("Are you sure you want to delete customer (" + customer.name + ")");
            if (cofirmResponse) {
                console.log(angular.toJson(customer));
                services.deleteCustomer(angular.toJson(customer)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        setTimeout($scope.getCompanyCustomers, 500);
                    } else if (response === "UnSucceeded") {
                        $scope.showcustomerAddingError = true;
                        $scope.customerAddingErrorMessage = "There was a problem when deleting the customer, please try again";
                    }
                });
            }
        };

        $scope.showAddObjectModal = function (customer) {
            $scope.currentCustomer = customer;
            $scope.showCustomerModal = true;
            $scope.showCustomerObjectModalContent = true;
            $scope.customerObjectAddOrEditMessage = "Add object to customer (" + customer.name + ")";
        };

        $scope.saveObject = function() {
            if ($scope.customerObjectAddOrEditMessage.indexOf("Add") != -1) {
                $scope.addObjectToCustomer();
            } else {
                $scope.modifyCustomerObject();
            }
        };

        $scope.addObjectToCustomer = function() {
            $scope.customerObjectDetails.companyId = $scope.currentCustomer.companyId;
            $scope.customerObjectDetails.customerId = $scope.currentCustomer.id;
            services.addObjectToCustomer(angular.toJson($scope.customerObjectDetails)).then(function (data) {
                var responce = data.substring(1, data.length - 1);
                if (responce === "Succeeded") {
                    $scope.hideCustomerModal();
                    setTimeout($scope.getCompanyCustomers, 500);
                }else if (responce === "UnSucceeded") {
                    $scope.showcustomerObjectAddingError = true;
                    $scope.customerObjectAddingErrorMessage = "There was a problem when adding object to the customer, please try again";
                } else {
                    $scope.showcustomerObjectAddingError = true;
                    $scope.customerObjectAddingErrorMessage = responce;
                }
            });
        };

        $scope.modifyCustomerObject = function() {

        };
    }])