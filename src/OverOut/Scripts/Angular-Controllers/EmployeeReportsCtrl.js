angular.module("OverOut")
    .controller("EmployeeReportsCtrl", ["$scope", "services", function ($scope, services) {

        $scope.reportNames = [{ name: "FBS" }, { name: "PL13" }, { name: "GRIP" }];
        $scope.pl13FbsOptions = {
            optionChosen: null,
            choices: [
                {
                    id: 1,
                    text: "AVV"
                },
                {
                    id: 2,
                    text: "AVL"
                },
                {
                    id: 3,
                    text: "OMH"
                }
            ]
        };

        $scope.gripOptions = {
            optionChosen: null,
            choices: [
                {
                    id: 1,
                    text: "Protection Visitation"
                },
                {
                    id: 2,
                    text: "Jail"
                }
            ]
        };

        $scope.protocolText = "";
        $scope.reasonText = "";

        $scope.selectedReport = null;
        $scope.selectedCustomer = null;
        $scope.selectedObject = null;

        $scope.$on("employeeReports", function () {
            $('#myModal').on('hidden.bs.modal', function (e) {
                $scope.clearValues();
            });
            $scope.getAllEmployeeReport();
        });

        $scope.getAllEmployeeReport = function () {
            services.getAllEmployeeReports().then(function (data) {
                $scope.employeeReports = data;
                $scope.getCompanyCustomers();
            });
        };

        $scope.getCompanyCustomers = function () {
            services.getCompanyCustomers().then(function (data) {
                $scope.companyCustomers = data;
            });
        };

        $scope.showCreateReportModal = function () {
            $("#myModal").modal("show");
        };

        $scope.clearValues = function () {
            $scope.showObject = false;
            $scope.showReports = false;
            $scope.fbsShow = false;
            $scope.pl13Show = false;
            $scope.gripShow = false;
            $scope.selectedReport = null;
            $scope.selectedObject = null;
            $scope.pl13FbsOptions.optionChosen = null;
            $scope.gripOptions.optionChosen = null;
            $scope.selectedCustomer = null;
            $scope.reasonText = "";
            $scope.protocolText = "";
        };

        $scope.currentCustomerSelected = function () {
            $scope.selectedObject = null;
            $scope.pl13FbsOptions.optionChosen = null;
            $scope.gripOptions.optionChosen = null;
            $scope.customerObjects = ($scope.selectedCustomer === null) ? [] : $scope.selectedCustomer.objects;
            $scope.showObject = ($scope.selectedCustomer === null) ? false : true;
            $scope.showReports = false;
            $scope.fbsShow = false;
            $scope.pl13Show = false;
            $scope.gripShow = false;
            $scope.reasonText = "";
            $scope.protocolText = "";
        };

        $scope.currentCustomerObjectSelected = function () {
            $scope.selectedReport = null;
            $scope.pl13FbsOptions.optionChosen = null;
            $scope.gripOptions.optionChosen = null;
            $scope.showReports = ($scope.selectedObject === null) ? false : true;
            $scope.fbsShow = false;
            $scope.pl13Show = false;
            $scope.gripShow = false;
            $scope.reasonText = "";
            $scope.protocolText = "";
        };

        $scope.currentReportSelected = function () {

            $scope.reasonText = "";
            $scope.protocolText = "";
            $scope.pl13FbsOptions.optionChosen = null;
            $scope.gripOptions.optionChosen = null;

            if ($scope.selectedReport === null) {
                $scope.fbsShow = false;
                $scope.pl13Show = false;
                $scope.gripShow = false;
            } else {
                if ($scope.selectedReport.name === "FBS") {
                    $scope.fbsShow = true;
                    $scope.pl13Show = false;
                    $scope.gripShow = false;
                    $scope.gripMarginLeft = "20px";
                }

                if ($scope.selectedReport.name === "PL13") {
                    $scope.fbsShow = false;
                    $scope.pl13Show = true;
                    $scope.gripShow = false;
                    $scope.gripMarginLeft = "20px";
                }

                if ($scope.selectedReport.name === "GRIP") {
                    $scope.fbsShow = false;
                    $scope.pl13Show = false;
                    $scope.gripShow = true;
                    $scope.gripMarginLeft = "0px";
                }
            }
        };

        $scope.pl13FbsOptionsSelected = function () {
            $scope.pl13FbsOptionsReportName = $scope.pl13FbsOptions.choices[$scope.pl13FbsOptions.optionChosen - 1].text;
            $scope.gripOptionReportName = "";
            $scope.gripOptions.optionChosen = null;
            $scope.reasonText = "";
            $scope.protocolText = "";
            if ($scope.pl13FbsOptionsReportName === "OMH") {
                $scope.gripShow = true;
            } else {
                $scope.gripShow = false;
            }
        };

        $scope.gripOptionsOptionsSelected = function () {
            $scope.gripOptionReportName = $scope.gripOptions.choices[$scope.gripOptions.optionChosen - 1].text;
            $scope.pl13FbsOptionsReportName = "";
            $scope.reasonText = "";
            $scope.protocolText = "";
        };

        $scope.saveReport = function () {

            var reportModelObject = {};
            if ($scope.fbsShow || $scope.pl13Show) {
                if ($scope.pl13FbsOptionsReportName === "AVV") {
                    reportModelObject.avv = true;
                } else if ($scope.pl13FbsOptionsReportName === "AVL") {
                    reportModelObject.avl = true;
                } else {

                    $scope.setGripOptions(reportModelObject);
                }

            } else {
                $scope.setGripOptions(reportModelObject);
            }

            var report = {
                customerId: $scope.selectedCustomer.id,
                customerObjectId: $scope.selectedObject.id,
                customerName: $scope.selectedCustomer.name,
                customerObjectName: $scope.selectedObject.name,
                reportName: $scope.selectedReport.name,
                ReportModel: reportModelObject
            };

            console.log(report);
        };

        $scope.setGripOptions = function (reportModelObject) {
            if ($scope.gripOptionReportName === "Protection Visitation") {
                reportModelObject.omh = {
                    skyddsVisitation: true,
                    anledning: $scope.reasonText
                };

            } else {
                reportModelObject.omh = {
                    fangsel: true,
                    protocol: $scope.protocolText
                };
            }
        };

    }])