angular.module('foodzApp')
  .component('checkoutMain', {
    templateUrl: 'scripts/Checkout/checkout.template.html',
    controller: function(localStorageService, $rootScope, $location, $route){
      var $ctrl = this;

      $ctrl.$onInit = function () {
        setCheckoutItems();
      };

      $ctrl.activePage = $rootScope.activePage;
      function setCheckoutItems() {
        if(localStorageService.get('checkoutItems')){
          $ctrl.checkoutItems = localStorageService.get('checkoutItems');
        }
        else {
          $ctrl.checkoutItems = [];
        }
      }


      $ctrl.restart = function () {
        localStorageService.set('checkoutItems', null);
        localStorageService.set('rejectedCheckoutItems', null);
        $route.reload();
        $location.path('/mood')
      };


    },
    bindings: {
    }
  });
