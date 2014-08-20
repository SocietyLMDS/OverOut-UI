angular.module("OverOut")
    .controller("SchedulesCtrl", ["$scope", "services", function ($scope, services) {

        $scope.showScheduleModal = false;
        $scope.scheduleAddOrEditMessage = "";
        $scope.scheduleAddingErrorMessage = "";
        $scope.selectedCustomer = null;
        $scope.selectedObject = null;
        $scope.selectedObjectNeed = null;

        $scope.$on("schedules", function () {
            $scope.getCompanySchedules();
        });

        $scope.getCompanySchedules = function() {
            services.getCompanySchedules().then(function(data) {
                $scope.companySchedules = data;
                $scope.getCompanyCustomers();
            });
        };

        $scope.getCompanyCustomers = function() {
            services.getCompanyCustomers().then(function(data) {
                $scope.companyCustomers = data;
                $scope.getCompanyEmployess();
            });
        };
        
        $scope.getCompanyEmployess = function () {
            services.getCompanyEmployees().then(function (data) {
                $scope.compayEmployess = data;
            });
        };

        $scope.showCreateModal = function () {
            $scope.showScheduleModal = true;
            $scope.showStep1 = true;
            $scope.scheduleAddOrEditMessage = "Create Schedule";
        };

        $scope.CreateSchedule = function() {
            console.log("schedules");
        };

        $scope.ModifySchedule = function () {
            console.log("schedules");
        };

        $scope.hideScheduleModal = function() {
            $scope.showScheduleModal = false;
            $scope.showStep1 = false;
            $scope.showStep2 = false;
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
        };
        
        $scope.saveEmployee = function () {
            
        };

        $scope.currentCustomerSelected = function() {
            if ($scope.selectedCustomer !== null) {
                $scope.showObjectSelection = true;
                $scope.customerObjects = $scope.selectedCustomer.objects;
                $scope.showObjectNeeds = false;
                $scope.showDateSelection = false;
                $scope.showAddEmployee = false;
            } else {
                $scope.showObjectSelection = false;
                $scope.customerObjects = [];
                $scope.selectedObject = null;
                $scope.objectNeeds = [];
                $scope.showObjectNeeds = false;
                
            }
        };

        $scope.currentCustomerObjectSelected = function() {
            if ($scope.selectedObject !== null) {
                $scope.customerObjectNeeds = $scope.selectedObject.needs;
                if ($scope.customerObjectNeeds.length > 0) {
                    $scope.showObjectNeeds = true;
                    $scope.showDateSelection = false;
                } else {
                    $scope.showObjectNeeds = false;
                    $scope.showDateSelection = true;
                }
                $scope.selectedObjectNeed = null;
                $scope.showAddEmployee = false;
            } else {
                $scope.objectNeeds = [];
                $scope.showObjectNeeds = null;
                $scope.showDateSelection = false;
                $scope.showAddEmployee = false;
                $scope.selectedObjectNeed = null;
            }
        };

        $scope.currentCustomerObjectNeedSelected = function () {
            if ($scope.selectedObjectNeed != null) {
                $scope.showAddEmployee = true;
            } else {
                $scope.showAddEmployee = false;
            }
        };
    }])