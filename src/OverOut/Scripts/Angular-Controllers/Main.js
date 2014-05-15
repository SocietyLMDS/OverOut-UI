angular.module('OverOut')
    .controller('Main', ['$scope', 'services', function ($scope, services) {
        $scope.userDetails = {

            id: '',
            companyId: '',
            companyName: '',
            userType: '',
            firstname: '',
            lastname: '',
            emailAddress: '',
            userBasicAuth: '',
            userAuthorised:''
        };
    }])