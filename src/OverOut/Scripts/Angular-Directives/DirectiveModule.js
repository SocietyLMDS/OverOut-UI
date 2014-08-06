angular.module("DirectiveModule", [])
    .directive("uploadLogo", function () {
        return {
            restrict: 'A',
            template: '',
            scope: true,
            link: function (scope, elem, attr) {
                elem.bind("click", function () {
                    var element = document.getElementById("FileUpLoad");
                    element.click();
                });
            }
        };
    }).directive("fileLoaded", ["services", "$rootScope", function (services, $rootScope) {
        return {
            restrict: 'A',
            template: '',
            scope: true,
            link: function (scope, elem, attr) {
                elem.bind("change", function () {
                    var fd = new FormData();
                    fd.append("file", this.files[0]);
                    services.uploadLogo(fd).then(function (data) {
                        $rootScope.$broadcast('logoUploaded', data);
                    });
                });
            }
        };
    }]);