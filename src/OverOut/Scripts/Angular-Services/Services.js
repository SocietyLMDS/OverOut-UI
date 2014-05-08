angular.module('ServiceModule', [])
    .service('services', ['$http', function ($http) {
        return {
            Login : function(auth) {
                return $http.post('http://localhost:57903/api/security/login', { headers: { 'Authorization': auth } }).then(function (data) {
                    return data.data;
                }, function(data) {
                    return data.status;
                });
            },
            Register : function(companyJson) {
                return $http.post('http://localhost:57903/api/company/addcompany', { params: {company : companyJson }}).then(function (data) {
                    return data.data;
                }, function(data) {
                    return data.status;
                });
            },
        };
    }])