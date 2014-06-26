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
            forgotPassword: function (emailJson) {
                return $http.post("/Repository/ForgotPassword", emailJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            getUser: function () {
                return $http.post("/Repository/GetUser").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            getCurrentCompany: function () {
                return $http.get("/Repository/GetCurrentCompany").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            getCompanyEmployees: function () {
                return $http.get("/Repository/GetCompanyEmployees").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            getCompanyCustomers: function () {
                return $http.get("/Repository/GetCompanyCustomers").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            getCompanyReports: function () {
                return $http.get("/Repository/GetCompanyReports").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            getCompanySchedules: function () {
                return $http.get("/Repository/GetCompanySchedules").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            addCustomer: function (customerJson) {
                return $http.post("/Repository/AddCustomer", customerJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            modifyCustomer: function (customerJson) {
                return $http.post("/Repository/ModifyCustomer", customerJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            deleteCustomer: function (customerJson) {
                return $http.post("/Repository/DeleteCustomer", customerJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            addObjectToCustomer: function (objectJson) {
                return $http.post("/Repository/AddCustomerToObject", objectJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            
        };
    }])