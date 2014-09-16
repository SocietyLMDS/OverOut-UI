angular.module("OverOut")
    .controller("CustomersCtrl", ["$scope", "services", function ($scope, services) {

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

        //add edit customer object need
        $scope.showCustomerObjectNeedModalContent = false;
        $scope.showCustomerObjectNeedAddingError = false;
        $scope.customerObjectNeedAddingErrorMessage = "";
        $scope.customerObjectNeedAddOrEditMessage = "";

        //datepicker and timepicker
        //Date and time picket
        $scope.startDatePicker = null;
        $scope.endDatePicker = null;
        $scope.minDate = new Date();
        $scope.maxDate = "2015-06-22";
        $scope.format = "dd-MMMM-yyyy";
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.hourStep = 1;
        $scope.minuteStep = 1;
        $scope.ismeridian = false;

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

        $scope.customerObjectNeedDetails = {
            id: "",
            customerObjectId: "",
            customerId: "",
            companyId: "",
            numberOfPersonalNeeded: "",
            startDateTime: "",
            endDateTime: ""
        };

        $scope.$on("customers", function () {
            $scope.ResetStartEndDateTime();
            $scope.HideTimeUpAndDownArrow();
            $scope.getCompanyCustomers();

        });

        $scope.getCompanyCustomers = function () {
            services.getCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
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
            $scope.showCustomerObjectNeedModalContent = false;
            $scope.CustomerObjectNeedAddOrEditMessage = "";
            $scope.showCustomerObjectNeedAddingError = false;
            $scope.CustomerObjectNeedAddingErrorMessage = "";
            $scope.clearInputTexts($scope.customerDetails);
            $scope.clearInputTexts($scope.customerObjectDetails);
            $scope.clearInputTexts($scope.customerObjectNeedDetails);
            $scope.ResetStartEndDateTime();
        };

        $scope.clearInputTexts = function (object) {
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
                    setTimeout($scope.getCompanyCustomers, 200);
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
                    setTimeout($scope.getCompanyCustomers, 200);
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
                services.deleteCustomer(angular.toJson(customer)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        setTimeout($scope.getCompanyCustomers, 200);
                    } else if (response === "UnSucceeded") {
                        alert("There was a problem when deleting the customer, please try again");
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

        $scope.saveObject = function () {
            if ($scope.customerObjectAddOrEditMessage.indexOf("Add") != -1) {
                $scope.addObjectToCustomer();
            } else {
                $scope.modifyCustomerObject();
            }
        };

        $scope.addObjectToCustomer = function () {
            $scope.customerObjectDetails.companyId = $scope.currentCustomer.companyId;
            $scope.customerObjectDetails.customerId = $scope.currentCustomer.id;
            services.addObjectToCustomer(angular.toJson($scope.customerObjectDetails)).then(function (data) {
                var responce = data.substring(1, data.length - 1);
                if (responce === "Succeeded") {
                    $scope.hideCustomerModal();
                    setTimeout($scope.getCompanyCustomers, 200);
                } else if (responce === "UnSucceeded") {
                    $scope.showcustomerObjectAddingError = true;
                    $scope.customerObjectAddingErrorMessage = "There was a problem when adding object to the customer, please try again";
                } else {
                    $scope.showcustomerObjectAddingError = true;
                    $scope.customerObjectAddingErrorMessage = responce;
                }
            });
        };

        $scope.showModifyCustomerObject = function (object) {
            $scope.customerObjectDetails = {
                id: object.id,
                customerId: object.customerId,
                companyId: object.companyId,
                name: object.name,
                visitationAddress: { street: object.visitationAddress.street, postcode: object.visitationAddress.postcode },
                responsibleGuardFirstname: object.responsibleGuardFirstname,
                responsibleGuardLastname: object.responsibleGuardLastname,
                responsibleManagerFistname: object.responsibleManagerFistname,
                responsibleManagerLastname: object.responsibleManagerLastname,
                licenseType: object.licenseType,
                license: object.license,
                hourlyRate: object.hourlyRate,
            };

            $scope.showCustomerModal = true;
            $scope.showCustomerObjectModalContent = true;
            $scope.customerObjectAddOrEditMessage = "Modify customer object (" + object.name + ")";
        };

        $scope.modifyCustomerObject = function () {
            services.modifyCustomerObject(angular.toJson($scope.customerObjectDetails)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.hideCustomerModal();
                    $scope.getCompanyCustomers();
                } else if (response === "UnSucceeded") {
                    $scope.showcustomerObjectAddingError = true;
                    $scope.customerObjectAddingErrorMessage = "There was a problem when modifying the customer object, please try again";
                }
            });
        };

        $scope.deleteCustomerObject = function (object) {
            var confirmResponse = confirm("Are you sure you want to delete object (" + object.name + ")");
            if (confirmResponse) {
                services.deleteCustomerObject(angular.toJson(object)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        $scope.getCompanyCustomers();
                    } else if (response === "UnSucceeded") {
                        alert("There was a problem when deleting the customer object, please try again");
                    }
                });
            }
        };

        $scope.showAddNeedToCustomerObjectModal = function (object) {
            $scope.currentObject = object;
            $scope.showCustomerObjectNeedModalContent = true;
            $scope.showCustomerModal = true;
            $scope.customerObjectNeedAddOrEditMessage = "Add need to object (" + object.name + ")";
        };

        $scope.showModidyCustomerObjectNeedModal = function (need) {
            $scope.customerObjectNeedDetails = {
                id: need.id,
                customerObjectId: need.customerObjectId,
                customerId: need.customerId,
                companyId: need.companyId,
                numberOfPersonalNeeded: Number(need.numberOfPersonalNeeded)
            };
            $scope.startDatePicker = moment(need.startDateTime).toDate();
            $scope.endDatePicker = moment(need.endDateTime).toDate();
            $scope.startTime = moment(need.startDateTime).toDate();
            $scope.endTime = moment(need.endDateTime).toDate();
            console.log($scope.startTime, $scope.endTime);
            $scope.showCustomerObjectNeedModalContent = true;
            $scope.showCustomerModal = true;
            $scope.customerObjectNeedAddOrEditMessage = "Modify Need";
        };

        $scope.saveNeeds = function () {
            if ($scope.customerObjectNeedAddOrEditMessage.indexOf("Add") != -1) {
                $scope.addNeedToCustomerObject();
            } else {
                $scope.modifyCustomerObjectNeed();
            }
        };

        $scope.addNeedToCustomerObject = function () {
            if ($scope.startDatePicker === null || $scope.endDatePicker === null) {
                $scope.showCustomerObjectNeedAddingError = true;
                $scope.customerObjectNeedAddingErrorMessage = "You haven't chosen a start date or an end date";
            } else {
                $scope.customerObjectNeedDetails.customerObjectId = $scope.currentObject.id;
                $scope.customerObjectNeedDetails.customerId = $scope.currentObject.customerId;
                $scope.customerObjectNeedDetails.companyId = $scope.currentObject.companyId;
                $scope.startDatePicker.setHours($scope.startTime.getHours(), $scope.startTime.getMinutes(), $scope.startTime.getSeconds());
                $scope.endDatePicker.setHours($scope.endTime.getHours(), $scope.endTime.getMinutes(), $scope.endTime.getSeconds());
                $scope.customerObjectNeedDetails.startDateTime = $scope.startDatePicker;
                $scope.customerObjectNeedDetails.endDateTime = $scope.endDatePicker;
                services.addNeedToCustomerObject(angular.toJson($scope.customerObjectNeedDetails)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        $scope.hideCustomerModal();
                        setTimeout($scope.getCompanyCustomers, 200);
                    } else if (response == "UnSucceeded") {
                        $scope.showCustomerObjectNeedAddingError = true;
                        $scope.customerObjectNeedAddingErrorMessage = "There was a problem adding need to the object, please try again";
                    } else {
                        $scope.showCustomerObjectNeedAddingError = true;
                        $scope.customerObjectNeedAddingErrorMessage = response;
                    }
                });
            }
        };

        $scope.modifyCustomerObjectNeed = function () {
            if ($scope.startDatePicker === null || $scope.endDatePicker === null) {
                $scope.showCustomerObjectNeedAddingError = true;
                $scope.customerObjectNeedAddingErrorMessage = "You haven't chosen a start date or an end date";
            } else {
                $scope.startDatePicker.setHours($scope.startTime.getHours(), $scope.startTime.getMinutes(),"00");
                $scope.endDatePicker.setHours($scope.endTime.getHours(), $scope.endTime.getMinutes(), "00");
                $scope.customerObjectNeedDetails.startDateTime = $scope.startDatePicker;
                $scope.customerObjectNeedDetails.endDateTime = $scope.endDatePicker;
                services.modifyCustomerObjectNeed(angular.toJson($scope.customerObjectNeedDetails)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        $scope.hideCustomerModal();
                        setTimeout($scope.getCompanyCustomers, 200);
                    } else if (response == "UnSucceeded") {
                        $scope.showCustomerObjectNeedAddingError = true;
                        $scope.customerObjectNeedAddingErrorMessage = "There was a problem modifying the need, please try again";
                    } else {
                        $scope.showCustomerObjectNeedAddingError = true;
                        $scope.customerObjectNeedAddingErrorMessage = response;
                    }
                });
            }
        };

        $scope.deleteCustomerObjectNeed = function (need) {
            var confirmResponse = confirm("Are you sure you want to delete need");
            if (confirmResponse) {
                services.deleteCustomerObjectNeed(angular.toJson(need)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        $scope.getCompanyCustomers();
                    } else if (response === "UnSucceeded") {
                        alert("There was a problem when deleting the need, please try again");
                    }
                });
            }
        };

        $scope.startOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            if ($scope.starTimeOpened) {
                $scope.starTimeOpened = false;
            } else {
                $scope.starTimeOpened = true;
            }
        };

        $scope.endOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            if ($scope.endTimeOpened) {
                $scope.endTimeOpened = false;
            } else {
                $scope.endTimeOpened = true;
            }
        };

        $scope.HideTimeUpAndDownArrow = function () {
            $(".btn-link").css("visibility", "hidden");
        };

        $scope.ResetStartEndDateTime = function () {
            $scope.startDatePicker = null;
            $scope.endDatePicker = null;
            var date = new Date();
            $scope.startTime = new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes() + 15, date.getSeconds());
            $scope.endTime = new Date($scope.startTime.getFullYear(), $scope.startTime.getMonth(), $scope.startTime.getDay(), $scope.startTime.getHours() + 1, $scope.startTime.getMinutes(), $scope.startTime.getSeconds());
        };
    }])