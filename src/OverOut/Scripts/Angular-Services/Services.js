angular.module('ServiceModule', [])
    .service('services', ['$http', function ($http) {
        return {
            Login: function (username, password) {
                return $http.post('/login/index', { username: username, password: password }).then(function (data) {
                    window.location.href = data.data;
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            Register: function (companyJson) {
                return $http.post('http://localhost:57903/api/company/addcompany', companyJson, { headers: { 'Content-Type': 'application/json' } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
        };
    }])