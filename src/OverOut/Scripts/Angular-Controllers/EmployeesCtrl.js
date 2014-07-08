angular.module("OverOut")
    .controller("EmployeesCtrl", ["$scope", "services", function ($scope, services) {

        $scope.showEmployeeAddingError = false;
        $scope.employeeAddingErrorMessage = "";
        $scope.employeeAddOrEditMessage = "";
        
        $scope.employeeDetials = {
            id: "",
            companyId:"",
            firstName: "",
            lastName: "",
            jobDescription: "",
            employmentNumber: "",
            personalNumber: "",
            address: { street: "", postcode: "" },
            nationality: "",
            phoneNumber: "",
            mobileNumber: "",
            emailAddress: "",
            bankAccount: "",
            hourlyRate: ""
         };

        $scope.$on("employees", function() {
            $scope.getCompanyEmployees();
        });

        $scope.getCompanyEmployees = function() {
            services.getCompanyEmployees().then(function(data) {
                $scope.position(data);
                $scope.companyEmployees = data;
            });
        };

        $scope.position = function(data) {
            $scope.employeesPositions = [];
            var length = 0;
            for (var i = 0; i < data.length; i++) {
                if (i == length) {
                    $scope.employeesPositions.push("0px");
                    length += 3;
                   
                } else {
                    $scope.employeesPositions.push("15px");
                }

            }
        };

        $scope.showAddEmployeeModal = function() {
            $scope.employeeAddOrEditMessage = "Add Employee";
            $scope.showEmployeeModal = true;
        };

        $scope.showEditEmployeeModal = function(employee) {
            $scope.employeeDetials = {
                id: employee.Id,
                companyId: employee.CompanyId,
                firstName: employee.Firstname,
                lastName: employee.Lastname,
                jobDescription: employee.JobDescription,
                employmentNumber: employee.EmploymentNumber,
                personalNumber: employee.PersonalNumber,
                address: { street: employee.Address.Street, postcode: employee.Address.Postcode },
                nationality: employee.Nationality,
                phoneNumber: employee.PhoneNumber,
                mobileNumber: employee.MobileNumber,
                emailAddress: employee.EmailAddress,
                bankAccount: employee.BankAccount,
                hourlyRate: employee.HourlyRate
            };
            $scope.employeeAddOrEditMessage = "Edit Employee";
            $scope.showEmployeeModal = true;
        };

        $scope.hideEmployeeModal = function() {
            $scope.showEmployeeModal = false;
            $scope.showEmployeeAddingError = false;
            $scope.employeeAddingErrorMessage = "";
            $scope.employeeAddOrEditMessage = "";
            $scope.clearInputTexts($scope.employeeDetials);
        };
        
        $scope.clearInputTexts = function (object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    if (key === "address") {
                        object[key] = { street: "", postcode: "" };
                    } else {
                        object[key] = "";
                    }
                }
            }
        };

        $scope.saveEmployee = function() {
            if ($scope.employeeAddOrEditMessage.indexOf("Add") != -1) {
                $scope.addEmployee();
            } else {
                $scope.modifyEmployee();
            }
        };

        $scope.addEmployee = function() {
            services.addEmployee(angular.toJson($scope.employeeDetials)).then(function(data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.hideEmployeeModal();
                    setTimeout($scope.getCompanyEmployees, 100);
                }else if (response === "UnSucceeded") {
                    $scope.showEmployeeAddingError = true;
                    $scope.employeeAddingErrorMessage = "There was a problem when adding the employee, please try again";
                } else {
                    $scope.showEmployeeAddingError = true;
                    $scope.employeeAddingErrorMessage = response;
                }
            });
        };

        $scope.modifyEmployee = function () {
            services.modifyEmployee(angular.toJson($scope.employeeDetials)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.hideEmployeeModal();
                    setTimeout($scope.getCompanyEmployees, 100);
                } else if (response === "UnSucceeded") {
                    $scope.showEmployeeAddingError = true;
                    $scope.employeeAddingErrorMessage = "There was a problem modifying the employee, please try again";
                } else {
                    $scope.showEmployeeAddingError = true;
                    $scope.employeeAddingErrorMessage = response;
                }
            });
        };

        $scope.deleteEmployee = function(employee) {
            var cofirmResponse = confirm("Are you sure you want to delete employee (" + employee.Firstname + " " + employee.Lastname + ")");
            if (cofirmResponse) {
                services.deleteEmployee(angular.toJson(employee)).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    if (response === "Succeeded") {
                        setTimeout($scope.getCompanyEmployees, 100);
                    } else if (response === "UnSucceeded") {
                        alert("There was a problem when deleting the customer, please try again");
                    }
                });
            }
        };
    }])