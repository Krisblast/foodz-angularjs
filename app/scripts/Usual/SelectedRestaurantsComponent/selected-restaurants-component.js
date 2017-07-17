angular.module('foodzApp')
  .component('selectedRestaurants', {
    templateUrl: 'scripts/Usual/SelectedRestaurantsComponent/selected-restaurants.html',
    controller: function(localStorageService){
      var $ctrl = this;

      $ctrl.removeRestaurant = function($index){
        $ctrl.selectedRestaurants.splice($index,1);
        localStorageService.set('selectedRestaurants', JSON.stringify($ctrl.selectedRestaurants));
      };

    },
    bindings: {
      selectedRestaurants: '<'
    }
  });
