angular.module('foodzApp')
  .component('restaurantSelector', {
    templateUrl: 'scripts/Usual/RestaurantSelectorComponent/restaurant-selector.html',
    controller: function (localStorageService) {
      var $ctrl = this;

      var _selected;

      $ctrl.selected = undefined;

      $ctrl.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
          _selected = value;
        } else {
          return _selected;
        }
      };

      $ctrl.modelOptions = {
        debounce: {
          default: 500,
          blur: 250
        },
        getterSetter: true
      };

      $ctrl.isObjSelected = function (obj) {
        return !angular.isObject(obj)
      };


      $ctrl.addToUsual = function (selected) {
        $ctrl.selectedRestaurants.push(selected);
        localStorageService.set('selectedRestaurants', JSON.stringify($ctrl.selectedRestaurants));
      };


    },
    bindings: {
      availableRestaurants: '<',
      selectedRestaurants: '<'
    }
  });
