angular.module('OverOut')
    .controller('LoginCtrl', ['$scope', 'services', function ($scope, services) {
        $scope.loginModel = { password: '', username: '' };

    }])