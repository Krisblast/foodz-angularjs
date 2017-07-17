angular.module('foodzApp')
  .component('appHeader', {
    templateUrl: 'scripts/header/header-app.html',
    controller: function($rootScope){
      var $ctrl = this;

      $ctrl.activePage = $rootScope.activePage;


    },
    bindings: {
    }
  });
