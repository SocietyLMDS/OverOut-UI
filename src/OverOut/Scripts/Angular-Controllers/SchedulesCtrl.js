angular.module("OverOut")
    .controller("SchedulesCtrl", ["$scope", "services", function ($scope, services) {

        $scope.showScheduleModal = false;
        $scope.scheduleAddOrEditMessage = "";
        $scope.scheduleAddingErrorMessage = "";
        $scope.selectedCustomer = null;
        $scope.selectedObject = null;
        $scope.selectedObjectNeed = null;
        $scope.selectedEmployee = null;
        $scope.employeeList = [];

        $scope.$on("schedules", function () {
            $scope.getCompanySchedules();
        });

        $scope.getCompanySchedules = function () {
            services.getCompanySchedules().then(function (data) {
                $scope.companySchedules = data;
                $scope.getCompanyCustomers();
            });
        };

        $scope.getCompanyCustomers = function () {
            services.getCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
                $scope.getCompanyEmployess();
            });
        };

        $scope.getCompanyEmployess = function () {
            services.getCompanyEmployees().then(function (data) {
                $scope.companyEmployees = data;
            });
        };

        $scope.showCreateModal = function () {
            $scope.showScheduleModal = true;
            $scope.showStep1 = true;
            $scope.scheduleAddOrEditMessage = "Create Schedule";
        };

        $scope.CreateSchedule = function () {
            console.log("schedules");
        };

        $scope.ModifySchedule = function () {
            console.log("schedules");
        };

        $scope.hideScheduleModal = function () {
            $scope.showScheduleModal = false;
            $scope.scheduleAddOrEditMessage = "";
            $scope.scheduleAddingErrorMessage = "";
            $scope.showObjectSelection = false;
            $scope.customerObjects = [];
            $scope.selectedObject = null;
            $scope.objectNeeds = [];
            $scope.showObjectNeeds = false;
            $scope.showDateSelection = false;
            $scope.selectedCustomer = null;
            $scope.showAddEmployee = false;
            $scope.employeeList = [];
        };

        $scope.saveSchedule = function () {
            console.log($scope.selectedCustomer.id);
            console.log($scope.selectedObject.id);
            console.log($scope.selectedObjectNeed.id);
            console.log($scope.employeeList);
        };

        var stepLevel = {
            customerlevel: function (flag) {
                $scope.showObjectNeeds = false;
                $scope.showDateSelection = false;
                $scope.showAddEmployee = false;
                $scope.employeeList = [];
                $scope.selectedEmployee = null;
                $scope.showAddEmployee = false;
                $scope.showEmployeeAddingError = false;
                $scope.scheduleAddingErrorMessage = "";
                $scope.showEmployees = false;
                $scope.showObjectSelection = flag;
            },
            objectLevel: function () {
                $scope.selectedObjectNeed = null;
                $scope.showAddEmployee = false;
                $scope.employeeList = [];
                $scope.selectedEmployee = null;
                $scope.showAddEmployee = false;
                $scope.showEmployeeAddingError = false;
                $scope.scheduleAddingErrorMessage = "";
                $scope.showEmployees = false;

            },
            showDateAndNeed: function (whichToSetToTrue) {
                $scope.showObjectNeeds = (whichToSetToTrue === "showObjectNeeds") ? true : false;
                $scope.showDateSelection = (whichToSetToTrue === "showDateSelection") ? true : false;;
            },
            ObjectNeed: function (flag) {
                $scope.showAddEmployee = flag;
                $scope.employeeList = [];
                $scope.selectedEmployee = null;
                $scope.showEmployees = false;
            },
            employee: function (flag, message) {
                $scope.showEmployeeAddingError = flag;
                $scope.scheduleAddingErrorMessage = message;
                $scope.selectedEmployee = null;
            }
        };

        $scope.currentCustomerSelected = function () {
            if ($scope.selectedCustomer !== null) {
                $scope.customerObjects = $scope.selectedCustomer.objects;
                stepLevel.customerlevel(true);
            } else {
                stepLevel.customerlevel(false);
            }
        };

        $scope.currentCustomerObjectSelected = function () {
            if ($scope.selectedObject !== null) {
                $scope.customerObjectNeeds = $scope.selectedObject.needs;
                if ($scope.customerObjectNeeds.length > 0) {
                    stepLevel.showDateAndNeed("showObjectNeeds");
                } else {
                    stepLevel.showDateAndNeed("showDateSelection");
                }
                stepLevel.objectLevel();
            } else {
                stepLevel.objectLevel();
            }
        };

        $scope.currentCustomerObjectNeedSelected = function () {
            if ($scope.selectedObjectNeed != null) {
                stepLevel.ObjectNeed(true);
            } else {
                stepLevel.ObjectNeed(false);
            }
        };

        $scope.employeeSelected = function () {
            var check = $scope.checkIfEmployeeAlreadyExist($scope.selectedEmployee);
            if (!check) {
                if ($scope.employeeList.length === Number($scope.selectedObjectNeed.numberOfPersonalNeeded)) {
                    stepLevel.employee(true, "You have added enough people needed for this schedule");
                } else {
                    $scope.employeeList.push($scope.selectedEmployee);
                    stepLevel.employee(false, "");
                }

            } else {
                stepLevel.employee(true, "The worker has already been added to the object need");
            }
            $scope.showEmployees = true;
        };

        $scope.checkIfEmployeeAlreadyExist = function (selectedEmployee) {
            var ret = false;
            for (var i = 0; i < $scope.employeeList.length; i++) {
                var employee = $scope.employeeList[i];
                if (employee.Id === selectedEmployee.Id) {
                    ret = true;
                }
            }
            return ret;
        };

        $scope.deleteEmployee = function (index) {
            $scope.employeeList.splice(index, 1);
        };

        $scope.$watch("dt", function (date) {
            console.log(date);
        });
        
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            //return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            return false;
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

    }])