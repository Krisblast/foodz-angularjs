angular.module('foodzApp').directive('isAuthenticated', function () {
  return {
    restrict: 'A',
    link: function ($scope, element, attrs) {
      if(!$scope.$root.user){
        element.hide();
      }
    }
  }
});
