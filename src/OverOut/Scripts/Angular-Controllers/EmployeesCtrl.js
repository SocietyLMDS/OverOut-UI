angular.module("OverOut")
    .controller("EmployeesCtrl", ["$scope", "services", function ($scope, services) {

        $scope.companyEmployess = [];
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

        $scope.initiate = function () {

        };

        $scope.showAddEmployeeModal = function() {
            $scope.employeeAddOrEditMessage = "Add Employee";
            $scope.showEmployeeModal = true;
        };

        $scope.hideEmployeeModal = function() {
            $scope.showEmployeeModal = false;
        };

        $scope.saveEmployee = function() {

        };
    }])