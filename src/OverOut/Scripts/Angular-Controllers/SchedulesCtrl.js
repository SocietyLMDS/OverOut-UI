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

        //Date and time picker
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

        $scope.radioBox = {
            userChoice: null,
            choices: [{
                id: 1,
                text: "Schedule from need",
            }, {
                id: 2,
                text: "schedule from time picker",

            }]
        };

        //event listener
        $scope.$on("schedules", function () {
            $scope.getCompanySchedules();
            $scope.HideTimeUpAndDownArrow();
        });

        $scope.getCompanySchedules = function () {
            services.getCompanySchedules().then(function (data) {
                console.log(data.length);
                $scope.Getposition(data);
                $scope.companySchedules = data;
                $scope.getCompanyCustomers();
            });
        };

        $scope.Getposition = function (data) {
            $scope.employeesPositions = [];
            var length = 0;
            for (var i = 0; i < data.length; i++) {
                if (i == length) {
                    $scope.employeesPositions.push("0px");
                    length += 2;

                } else {
                    $scope.employeesPositions.push("7px");
                }

            }
        };

        $scope.getCompanyCustomers = function () {
            services.getCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
                $scope.getCompanyEmployess();
            });
        };

        $scope.getCompanyEmployess = function () {
            services.getCompanyEmployees().then(function (data) {
                $scope.companyEmployees = $scope.convertKeysToCamelCase(data);
            });
        };
        
        $scope.convertKeysToCamelCase = function (obj) {
            if (!obj || typeof obj !== "object") return null;

            if (obj instanceof Array) {
                return $.map(obj, function (value) {
                    return $scope.convertKeysToCamelCase(value);
                });
            }

            var newObj = {};
            $.each(obj, function (key, value) {
                key = key.charAt(0).toLowerCase() + key.slice(1);
                newObj[key] = value;
            });

            return newObj;
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
            $scope.showCustomerSelection = false;
            $scope.ShowCustomerName = false;
            $scope.showObjectName = false;
        };

        $scope.ResetStartEndDateTime = function () {
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
                $scope.showChoicesRadioBox = false;
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
                $scope.showDateSelection = (whichToSetToTrue === "showDateSelection") ? true : false;
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
                    $scope.showChoicesRadioBox = true;
                } else {
                    $scope.radioBox.userChoice = "2";
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
            } else if (check == "do nothing") {
                
            } else {
                stepLevel.employee(true, "The worker has already been added to the object need");
            }
            $scope.showEmployees = true;
        };

        $scope.checkIfEmployeeAlreadyExist = function (selectedEmployee) {
            var ret = false;
            for (var i = 0; i < $scope.employeeList.length; i++) {
                var employee = $scope.employeeList[i];
                if (employee.id === selectedEmployee.id) {
                    if (employee.removed === true) {
                        employee.removed = false;
                        ret = "do nothing";
                    } else {
                        ret = true;
                    }
                    
                }
            }
            return ret;
        };

        $scope.deleteEmployee = function (index) {
            
            if ($scope.employeeList[index].shiftId === "00000000-0000-0000-0000-000000000000") {
                $scope.employeeList.splice(index,1);
            } else {
                $scope.employeeList[index].removed = true;
            }
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

        $scope.radioBoxSelected = function () {
            if ($scope.radioBox.userChoice === "1") {
                stepLevel.showDateAndNeed("showObjectNeeds");
            } else if ($scope.radioBox.userChoice === "2") {
                stepLevel.showDateAndNeed("showDateSelection");
            }
            stepLevel.objectLevel();
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
        
        $scope.showCreateModal = function () {
            $scope.showScheduleModal = true;
            $scope.showCustomerSelection = true;
            $scope.scheduleAddOrEditMessage = "Create Schedule";
        };

        $scope.showModifyModal = function (schedule) {
            $scope.showScheduleModal = true;
            $scope.scheduleAddOrEditMessage = "Edit Schedule";
            $scope.selectedCustomer = schedule.customerName;
            $scope.ShowCustomerName = true;
            $scope.selectedObject = schedule.customerObjectName;
            $scope.showObjectName = true;
            $scope.startDatePicker = moment(schedule.startDate).toDate();
            $scope.endDatePicker = moment(schedule.endDate).toDate();
            $scope.startTime = moment(schedule.startDate).toDate();
            $scope.endTime = moment(schedule.endDate).toDate();
            $scope.employeeList = $scope.returnNewArray(schedule.schedules);
            $scope.showDateSelection = true;
            $scope.showAddEmployee = true;
            $scope.showEmployees = true;
            $scope.currentSchedule = schedule;
        };

        $scope.returnNewArray = function (array) {
            var newArray = [];
            for (var i = 0; i < array.length; i++) {
                var schedule = array[i];
                for (var j = 0; j < $scope.companyEmployees.length; j++) {
                    if (schedule.employeeId === $scope.companyEmployees[j].id) {
                        $scope.companyEmployees[j].shiftId = schedule.id;
                        $scope.companyEmployees[j].removed = false;
                        newArray.push($scope.companyEmployees[j]);
                    }
                }
            }
            return newArray;
        };

        $scope.CreateModifySchedule = function () {
            if ($scope.scheduleAddOrEditMessage == "Create Schedule") {
                $scope.createSchedule();
            } else if ($scope.scheduleAddOrEditMessage == "Edit Schedule") {
                $scope.modifySchedule();
            }
        };

        $scope.createSchedule = function () {
            console.log($scope.selectedObject);
            var schedule = {};
            if ($scope.selectedObjectNeed !== null) {
                schedule.customerId = $scope.selectedCustomer.id;
                schedule.customerObjectId = $scope.selectedObject.id;
                schedule.customerName = $scope.selectedCustomer.name;
                schedule.customerObjectName = $scope.selectedObject.name;
                schedule.customerObjectAddress = $scope.selectedObject.visitationAddress;
                schedule.startDateAndTime = moment($scope.selectedObjectNeed.startDateTime).toDate();
                schedule.endDateAndTime = moment($scope.selectedObjectNeed.endDateTime).toDate();
                schedule.employees = $scope.employeeList;
                schedule.type = "ScheduleByNeed";
            } else {
                $scope.startDatePicker.setHours($scope.startTime.getHours(), $scope.startTime.getMinutes(), "00");
                $scope.endDatePicker.setHours($scope.endTime.getHours(), $scope.endTime.getMinutes(), "00");
                schedule.customerName = $scope.selectedCustomer.name;
                schedule.customerObjectName = $scope.selectedObject.name;
                schedule.customerObjectAddress = $scope.selectedObject.visitationAddress;
                schedule.customerId = $scope.selectedCustomer.id;
                schedule.customerObjectId = $scope.selectedObject.id;
                schedule.startDateAndTime = $scope.startDatePicker;
                schedule.endDateAndTime = $scope.endDatePicker;
                schedule.employees = $scope.employeeList;
                schedule.type = "ScheduleByDate";

            }
            var stepCheck;
            if (schedule.type === "ScheduleByNeed") {
                stepCheck = ($scope.selectedCustomer === null || $scope.selectedObject === null || $scope.selectedObjectNeed === null || $scope.employeeList.length != $scope.selectedObjectNeed.numberOfPersonalNeeded || $scope.radioBox.userChoice === null) ? false : true;
            } else {
                stepCheck = ($scope.selectedCustomer === null || $scope.selectedObject === null || $scope.employeeList.length <= 0 || $scope.radioBox.userChoice === null) ? false : true;
            }
            if (!stepCheck) {
                if ($scope.selectedObjectNeed != null && $scope.employeeList.length != $scope.selectedObjectNeed.numberOfPersonalNeeded || $scope.employeeList.length <= 0) {
                    $scope.showEmployeeAddingError = true;
                    $scope.scheduleAddingErrorMessage = "You haven't selected enough people required for the schedule";
                } else if ($scope.employeeList.length <= 0) {
                    $scope.showEmployeeAddingError = true;
                    $scope.scheduleAddingErrorMessage = "You haven't complete all the neccessary steps";
                }

            } else {
                services.addSchedule(angular.toJson(schedule)).then(function (data) {
                    var response = data;
                    if (response === "Succeeded") {
                        $scope.hideScheduleModal();
                        setTimeout($scope.getCompanySchedules, 200);
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
        
        $scope.modifySchedule = function () {
            var schedule = {};
            $scope.startDatePicker.setHours($scope.startTime.getHours(), $scope.startTime.getMinutes(), "00");
            $scope.endDatePicker.setHours($scope.endTime.getHours(), $scope.endTime.getMinutes(), "00");
            schedule.id = $scope.currentSchedule.id;
            schedule.customerName = $scope.currentSchedule.customerName;
            schedule.customerObjectName = $scope.currentSchedule.customerObjectName;
            schedule.customerObjectAddress = $scope.currentSchedule.customerObjectAddress;
            schedule.customerId = $scope.currentSchedule.customerId;
            schedule.customerObjectId = $scope.currentSchedule.customerObjectId;
            schedule.startDateAndTime = $scope.startDatePicker;
            schedule.endDateAndTime = $scope.endDatePicker;
            schedule.employees = $scope.employeeList;
            console.log($scope.employeeList);
            services.modifySchedule(schedule).then(function (data) {
                var response = data;
                if (response === "Succeeded") {
                    $scope.hideScheduleModal();
                    $scope.getCompanySchedules();
                } else if (response == "UnSucceeded") {
                    $scope.showEmployeeAddingError = true;
                    $scope.scheduleAddingErrorMessage = "There was a problem modifying the schedule, please try again";
                } else {
                    $scope.showEmployeeAddingError = true;
                    $scope.scheduleAddingErrorMessage = response;
                }
            });
        };

        $scope.deleteSchedule = function (schedule) {
            var confirms = confirm("Are you sure you want to delete this schedule");
            if (confirms) {
                services.deleteSchedule(schedule).then(function (data) {
                    var response = data.substring(1, data.length - 1);
                    console.log(response);
                    if (response === "Succeeded") {
                        $scope.hideScheduleModal();
                        $scope.getCompanySchedules();
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

        $scope.moments = function (date, dateOrTime) {
            var currentDate = moment(date);
            var ret = "";
            if (dateOrTime === "date") ret = currentDate.format("dddd, MMMM Do YYYY");
            if (dateOrTime === "time") ret = currentDate.format("HH:mm:ss");
            return ret;
        };
    }])