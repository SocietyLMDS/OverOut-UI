angular.module("OverOut")
    .controller("ProfileCtrl", ["$scope", "services", "$rootScope", "$timeout", function ($scope, services, $rootScope, $timeout) {

        $scope.showCompayAddError = false;
        $scope.showCompayAddSuccess = false;
        $scope.message = "";
        $scope.test = null;

        $scope.companyDetails = {
            id: "",
            name: "",
            organisationNumber: "",
            visitationAddress: { street: "", postcode: "" },
            postalAddress: { street: "", postcode: "" },
            emailAddress: "",
            phoneNumber: "",
            mobileNumber: "",
            faxNumber: "",
            websiteLink: "",
            managerFirstname: "",
            managerLastname: "",
            managerPersonalNumber: "",
            logoLink:""
            
        };

        $scope.$on("profile", function () {
            $scope.getCurrentCompany();
        });

        $scope.getCurrentCompany = function () {
            services.getCurrentCompany().then(function (data) {
                $scope.SetupCompanyProfile(data);
            });
        };

        $scope.SetupCompanyProfile = function (data) {
            console.log(data);
            $scope.companyDetails = {
                id: data.Id,
                name: data.Name,
                organisationNumber: data.OrganisationNumber,
                visitationAddress: { street: (data.VisitationAddress === null) ? "" : data.VisitationAddress.Street, postcode: (data.VisitationAddress === null) ? "" : data.VisitationAddress.Postcode },
                postalAddress: { street: (data.PostalAddress === null) ? "" : data.PostalAddress.Street, postcode: (data.PostalAddress === null) ? "" : data.PostalAddress.Postcode },
                emailAddress: data.EmailAddress,
                phoneNumber: data.PhoneNumber,
                mobileNumber: data.MobileNumber,
                faxNumber: data.FaxNumber,
                websiteLink: data.WebsiteLink,
                managerFirstname: data.ManagerFirstname,
                managerLastname: data.ManagerLastname,
                managerPersonalNumber: data.ManagerPersonalNumber,
                logoLink: data.LogoLink+ '?decache=' + Math.random()
            };
        };

        $scope.saveCompany = function () {
            services.modifyCompany(angular.toJson($scope.companyDetails)).then(function (data) {
                var response = data.substring(1, data.length - 1);
                if (response === "Succeeded") {
                    $scope.getCurrentCompany();
                    $scope.showCompayAddSuccess = true;
                    $scope.message = "Company was modified successfully";
                    setTimeout($scope.hideSuccessMessaged, 1000);
                } else if (response === "UnSuceeded") {
                    $scope.showCompayAddError = true;
                    $scope.message = "There was a problem when modifying the company, please try again";
                } else {
                    $scope.showCompayAddError = true;
                    $scope.message = response;
                }
            });
        };

        $scope.hideSuccessMessaged = function () {
            $scope.showCompayAddSuccess = false;
            $scope.message = "";
        };
        
        $rootScope.$on('logoUploaded', function (e, data) {
            $scope.getCurrentCompany();
        });
    }])

