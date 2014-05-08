angular.module('OverOut')
    .controller('RegisterCtrl', ['$scope', 'services', function ($scope, services) {

        $scope.jsonObject = {
            "Name": "Ladji's Vaktbolag",
            "OrganisationNumber": "777090909309",
            "VisitationAddress": {
                "Street": "Klockarvägen 15",
                "Postcode": "15161 Huddinge"
            },
            "PostalAddress": {
                "Street": "Klockarvägen 15",
                "Postcode": "15161 Huddinge"
            },
            "EmailAddress": "d_ladji@hotmail.com",
            "PhoneNumber": "0768515490",
            "MobileNumber": "0782398989",
            "FaxNumber": "465767676",
            "WebsiteLink": "www.ladji.com",
            "FTaxLink": "www.FTaxLink.com",
            "AuthorisationLink": "www.AuthorisationLink.com",
            "DiplomaLink": "www.DiplomaLink.com",
            "CertificationLink": "www.CertificationLink.com",
            "ManagerFirstname": "Ladji",
            "ManagerLastname": "Diakite",
            "ManagerPersonalNumber": "7708090894",
            "Password": "kuMoS7",
            "Username": "d_ladji@hotmail.com"
        };

        $scope.Register = function(parameters) {

            services.Register($scope.jsonObject).then(function (data) {

                console.log(data);
            });
        };

    }])

