angular.module('foodzApp')
  .component('usualMain', {
    templateUrl: 'scripts/Usual/usual-component.html',
    controller: function(localStorageService){
      var $ctrl = this;

      $ctrl.$onInit = function () {
        $ctrl.config = {};
        $ctrl.availableRestaurants = [];
        $ctrl.selectedRestaurants = [];

        getAvailableRestaurants();
        getSelectedRestaurants();
      };

      function getSelectedRestaurants() {
        $ctrl.selectedRestaurants = JSON.parse(localStorageService.get('selectedRestaurants')) || [];
      }

      function getAvailableRestaurants() {
        $ctrl.availableRestaurants = [
          {
            _id: 0,
            name: 'Seher`s 2 Pizza & Grillbar'
          },
          {
            _id: 1,
            name: 'Esperia Pizza Bar & Grill'
          },
          {
            _id: 2,
            name: 'Tårnby Pizza'
          },
          {
            _id: 3,
            name: 'Fiorentina 3 Pizza & Grill'
          },
          {
            _id: 4,
            name: 'Pizza Burger House'
          }

        ];
      }


    },
    bindings: {
    }
  });
