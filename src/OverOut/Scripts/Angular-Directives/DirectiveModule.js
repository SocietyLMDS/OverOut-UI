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
  }).directive("fileLoaded", function() {
      return {
          restrict: 'A',
          template: '',
          scope: true,
          link: function (scope, elem, attr) {
              elem.bind("blur", function () {
                  console.log("ladji");
              });
          }
      };
  });