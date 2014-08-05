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
            logout: function () {
                return $http.get("/login/logout").then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            changePassword: function (passwordJson) {
                return $http.post("/Repository/ChangePassword", passwordJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
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
                return $http.post("/Repository/AddObjectToCustomer", objectJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            modifyCustomerObject: function (objectJson) {
                return $http.post("/Repository/ModifyCustomerObject", objectJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            deleteCustomerObject: function (objectJson) {
                return $http.post("/Repository/DeleteCustomerObject", objectJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            addNeedToCustomerObject: function (needJson) {
                return $http.post("/Repository/AddNeedToCustomerObject", needJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            modifyCustomerObjectNeed: function (needJson) {
                return $http.post("/Repository/ModifyCustomerObjectNeed", needJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            deleteCustomerObjectNeed: function (needJson) {
                return $http.post("/Repository/DeleteCustomerObjectNeed", needJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            addEmployee: function(employeeJson) {
                return $http.post("/Repository/AddEmployee", employeeJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            modifyEmployee: function (employeeJson) {
                return $http.post("/Repository/ModifyEmployee", employeeJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            deleteEmployee: function (employeeJson) {
                return $http.post("/Repository/DeleteEmployee", employeeJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            modifyCompany: function (companyJson) {
                return $http.post("/Repository/ModifyCompany", companyJson, { headers: { "Content-Type": "application/json" } }).then(function (data) {
                    return data.data;
                }, function (data) {
                    return data.status;
                });
            },
            uploadLogo : function(fd) {
                return $http.post("/Repository/UploadLogo", fd, { withCredentials: true, headers: { 'Content-Type': undefined }, transformRequest: angular.identity }).then(function (data) {
                    return data.data;
                }, function(data) {
                    return data.status;
                });
            }
          };
    }])