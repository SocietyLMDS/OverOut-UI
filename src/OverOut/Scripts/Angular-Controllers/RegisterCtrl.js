angular.module('OverOut')
    .controller('RegisterCtrl', ['$scope', 'services', function ($scope, services) {

        $scope.registerModel = { name: '', emailAddress: '' };
        $scope.companyNameIsEmpty = false;
        $scope.emailIsEmpty = false;
        $scope.emailErrorText = "";

        $scope.register = function() {

            if ($scope.registerModel.name === "" && $scope.registerModel.emailAddress === "" ) {
                
                $scope.companyNameIsEmpty = true;
                $scope.emailIsEmpty = true;
                $scope.emailErrorText = "please enter your email address";
                return;
                
            }else if ($scope.registerModel.name === "") {
                
                $scope.companyNameIsEmpty = true;
                $scope.emailIsEmpty = false;
                return;

            }else if ($scope.registerModel.emailAddress == "") {
                
                $scope.companyNameIsEmpty = false;
                $scope.emailIsEmpty = true;
                $scope.emailErrorText = "please enter your email address";
                return;
                
            } else if ($scope.validateEmail($scope.registerModel.emailAddress) !== true) {
                
                $scope.companyNameIsEmpty = false;
                $scope.emailIsEmpty = true;
                $scope.emailErrorText = "You've entered and invalid email address";
                return;
            }

            services.Register(angular.toJson($scope.registerModel)).then(function (data) {

                console.log(data);
            });
        };

        $scope.login = function() {

            window.location.href = '/login/index';
        };
        
        $scope.validateEmail = function (email) {

            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (email.match(mailformat)) {

                return true;
            }
            else {

                return false;
            }
        };
    }])

