angular.module("ServiceModule", [])
    .service("services", ["$http", function ($http) {
        return {
            login: function (username, password) {
                return $http.post("/login/index", { username: username, password: password }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            register: function (companyJson) {
                return $http.post("/Repository/Register", companyJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            forgotPassword : function(emailJson) {
                return $http.post("/Repository/ForgotPassword", emailJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function(data) {
                    return data.status;
                });
            }
        };
    }])