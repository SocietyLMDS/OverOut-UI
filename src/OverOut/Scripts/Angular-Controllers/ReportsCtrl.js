angular.module("OverOut")
    .controller("ReportsCtrl", ["$scope", "services", "$sce", function ($scope, services, $sce) {

        $scope.$on("reports", function () {
            $scope.getCompanyReports();
        });

        $scope.getCompanyReports = function () {
            services.getCompanyReports().then(function (data) {
                console.log(data);
                $scope.companyReports = data;
            });
        };

        $scope.convertDate = function (date) {
            var currentDate = moment(date);
            var ret = currentDate.format("MMMM Do YYYY, HH:mm:ss");
            return ret;
        };

        $scope.setReportValue = function (reportDetails) {
            var reportStr = "";
            if (reportDetails.avl === false && reportDetails.omh == null) {
                reportStr = "Type: AVV";
            } else if (reportDetails.avv === false && reportDetails.omh == null) {
                reportStr = "Type: AVL";
            } else if (reportDetails.avl === false && reportDetails.avv == false) {
                if (reportDetails.omh.fangsel === true) {
                    reportStr = "Type: Jail</br>Protocol: " + reportDetails.omh.protocol;
                } else if (reportDetails.omh.skyddsVisitation === true) {
                    reportStr = "Type: Protection Visitation</br>Reason: " + reportDetails.omh.anledning;
                }
            }


            return $sce.trustAsHtml(reportStr);
        };
    }])