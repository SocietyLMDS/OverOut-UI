﻿angular.module("OverOut")
    .controller("SchedulesCtrl", ["$scope", "services", function ($scope, services) {

        $scope.showScheduleModal = false;
        $scope.scheduleAddOrEditMessage = "";
        $scope.scheduleAddingErrorMessage = "";
        $scope.selectedCustomer = null;
        $scope.selectedObject = null;
        $scope.selectedObjectNeed = null;
        $scope.selectedEmployee = null;
        $scope.employeeList = [];

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

        //event listener
        $scope.$on("schedules", function () {
            $scope.getCompanySchedules();
            $scope.HideTimeUpAndDownArrow();
        });

        $scope.getCompanySchedules2 = function () {
            services.getCompanySchedules().then(function (data) {
                $scope.companySchedules = data;
            });
        };

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
            $scope.startDatePicker = null;
            $scope.endDatePicker = null;
            $scope.startTime = new Date();
            $scope.endTime = new Date($scope.startTime.getFullYear(), $scope.startTime.getMonth(), $scope.startTime.getDay(), $scope.startTime.getHours() + 1, $scope.startTime.getMinutes(), $scope.startTime.getSeconds());
            $scope.space = "20px";
            $scope.position = "0px;";
            $scope.selectedObjectNeed = null;
            $scope.space2 = "30px";
        };

        $scope.ResetStartEndDateTime = function (parameters) {
            $scope.startDatePicker = null;
            $scope.endDatePicker = null;
            $scope.startTime = new Date();
            $scope.endTime = new Date($scope.startTime.getFullYear(), $scope.startTime.getMonth(), $scope.startTime.getDay(), $scope.startTime.getHours() + 1, $scope.startTime.getMinutes(), $scope.startTime.getSeconds());
        };

        var stepLevel = {
            customerlevel: function (flag) {
                $scope.selectedObjectNeed = null;
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
                $scope.ResetStartEndDateTime();
                $scope.space = "20px";
                $scope.position = "0px;";
                $scope.space2 = "30px";
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
                $scope.startDatePicker = null;
                $scope.endDatePicker = null;
                $scope.ResetStartEndDateTime();
                $scope.space = "20px";
                $scope.position = "0px;";
                $scope.space2 = "30px";
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
            },
            showAddEmployee: function () {
                $scope.showAddEmployee = true;
                $scope.showObjectNeeds = false;
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
                if ($scope.selectedObjectNeed !== null) {
                    if ($scope.employeeList.length === Number($scope.selectedObjectNeed.numberOfPersonalNeeded)) {
                        stepLevel.employee(true, "You have added enough people needed for this schedule");
                    } else {
                        $scope.employeeList.push($scope.selectedEmployee);
                        stepLevel.employee(false, "");
                    }
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

        $scope.$watch("startDatePicker", function () {
            if ($scope.startDatePicker !== null && $scope.endDatePicker !== null) {
                stepLevel.showAddEmployee();
                $scope.space = "160px";
                $scope.position = "-430px;";
                $scope.space2 = "5px";

            }
        });

        $scope.$watch("endDatePicker", function () {
            if ($scope.startDatePicker !== null && $scope.endDatePicker !== null) {
                stepLevel.showAddEmployee();
                $scope.space = "160px";
                $scope.position = "-430px;";
                $scope.space2 = "5px";
            }

        });

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

        $scope.startTimeChanged = function (date) {
            $scope.startTime = date;
        };

        $scope.endTimeChanged = function (date) {
            $scope.endTime = date;
        };

        $scope.HideTimeUpAndDownArrow = function () {
            $(".btn-link").css("visibility", "hidden");
        };

        $scope.saveSchedule = function () {

            var schedule = {};

            if ($scope.selectedObjectNeed !== null) {
                schedule.customerId = $scope.selectedCustomer.id;
                schedule.customerObjectId = $scope.selectedObject.id;
                schedule.day = $scope.selectedObjectNeed.weekDay;
                var startTimeSplit = $scope.selectedObjectNeed.startTime.split(":");
                schedule.startDateAndTime = new Date("", "", "", startTimeSplit[0], startTimeSplit[1], "");
                var endTimeSplit = $scope.selectedObjectNeed.endTime.split(":");
                schedule.endDateAndTime = new Date("", "", "", endTimeSplit[0], endTimeSplit[1], "");
                schedule.employees = $scope.employeeList;
                schedule.type = "ScheduleByNeed";
            } else {
                $scope.startDatePicker.setHours($scope.startTime.getHours(), $scope.startTime.getMinutes(), $scope.startTime.getSeconds());
                $scope.endDatePicker.setHours($scope.endTime.getHours(), $scope.endTime.getMinutes(), $scope.endTime.getSeconds());
                schedule.customerId = $scope.selectedCustomer.id;
                schedule.customerObjectId = $scope.selectedObject.id;
                schedule.startDateAndTime = $scope.startDatePicker;
                schedule.endDateAndTime = $scope.endDatePicker;
                schedule.employees = $scope.employeeList;
                schedule.type = "ScheduleByDate";
            }
            var stepCheck;
            if (schedule.type === "ScheduleByNeed") {
                stepCheck = ($scope.selectedCustomer === null || $scope.selectedObject === null || $scope.selectedObjectNeed === null || $scope.employeeList.length <= 0) ? false : true;
            } else {
                stepCheck = ($scope.selectedCustomer === null || $scope.selectedObject === null || $scope.employeeList.length <= 0) ? false : true;
            }
            if (!stepCheck) {
                $scope.showEmployeeAddingError = true;
                $scope.scheduleAddingErrorMessage = "You haven't complete all the neccessary steps";
            } else {
                services.addSchedule(angular.toJson(schedule)).then(function (data) {
                    console.log(data);
                    var response = data;
                    if (response === "Succeeded") {
                        $scope.hideScheduleModal();
                        setTimeout($scope.getCompanySchedules2, 200);
                    } else if (response == "UnSucceeded") {
                        $scope.showEmployeeAddingError = true;
                        $scope.scheduleAddingErrorMessage = "There was a problem creating a schedule, please try again";
                    } else {
                        $scope.showEmployeeAddingError = true;
                        $scope.scheduleAddingErrorMessage = response;
                    }
                });
            }

        };

    }])