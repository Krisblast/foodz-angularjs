angular.module('foodzApp')
  .component('pickerMain', {
    templateUrl: 'scripts/Picker/picker-component.html',
    controller: function($timeout, $route, localStorageService, $location, menuItemsService){
      var $ctrl = this;



      $ctrl.$onInit = function () {
        setMapFilters();
        setCheckoutItems();
        setRejectedCheckoutItems();
        setLatAndLng();

        menuItemsService.getAllMenuItems($ctrl.mapFilters, $ctrl.lat, $ctrl.lng).then(function (resp) {
          $ctrl.foodMenus = resp.data;
          if($ctrl.checkoutItems.length > 0){
            var checkoutIds = _.pluck($ctrl.checkoutItems, 'id');
            var rejectedCheckoutIds = _.pluck($ctrl.rejectedCheckoutItems, 'id');
            $ctrl.foodMenus = _.filter($ctrl.foodMenus, function(item){ return !_.contains(checkoutIds, item.id) && !_.contains(rejectedCheckoutIds, item.id)});
          }
          $ctrl.randomFoodMenu = $ctrl.foodMenus[Math.floor(Math.random()*$ctrl.foodMenus.length)];
        });
      };

      $ctrl.goingRight = false;
      $ctrl.goingLeft = false;

      $ctrl.swipeLeft = function (currentMenu) {
        //Remove from menu array
        removeFromMenuArray(currentMenu);
        $ctrl.rejectedCheckoutItems.push(currentMenu);
        localStorageService.set('rejectedCheckoutItems', $ctrl.rejectedCheckoutItems);
        $ctrl.goingLeft = true;
        $timeout(function () {
          $ctrl.goingLeft = false;
          $ctrl.randomFoodMenu = $ctrl.foodMenus[Math.floor(Math.random()*$ctrl.foodMenus.length)];
        },500)
      };

      $ctrl.swipeRight = function (currentMenu) {
        //Remove from menu array
        removeFromMenuArray(currentMenu);
        $ctrl.checkoutItems.push(currentMenu);
        localStorageService.set('checkoutItems', $ctrl.checkoutItems);
        $ctrl.goingRight = true;
        $timeout(function () {
          $ctrl.goingRight = false;
          $ctrl.randomFoodMenu = $ctrl.foodMenus[Math.floor(Math.random()*$ctrl.foodMenus.length)];
        },500)
      };

      $ctrl.restart = function () {
        localStorageService.set('checkoutItems', null);
        localStorageService.set('rejectedCheckoutItems', null);
        $route.reload();
      };

      function removeFromMenuArray(currentMenu) {
        var indexOfCurrent = _.indexOf($ctrl.foodMenus, currentMenu);
        $ctrl.foodMenus.splice(indexOfCurrent,1);
      }

      $ctrl.options = {
        throwOutConfidence: function (offset, element) {
          console.log('throwOutConfidence', offset, element.offsetWidth);
          return Math.min(Math.abs(offset) / element.offsetWidth, 1);
        },
        isThrowOut: function (offset, element, throwOutConfidence) {
          console.log('isThrowOut', offset, element.offsetWidth, throwOutConfidence);
          return throwOutConfidence === 1;
        }
      };
      function setMapFilters() {
        if(localStorageService.get('filters')){
          $ctrl.filters = localStorageService.get('filters');
          $ctrl.mapFilters = _.map($ctrl.filters, function (filter) {
            return filter.type.id;
          });
          $location.search('filters', $ctrl.mapFilters)
        }
        else {
          $ctrl.filters = [];
        }
      }

      function setCheckoutItems() {
        if(localStorageService.get('checkoutItems')){
          $ctrl.checkoutItems = localStorageService.get('checkoutItems');
        }
        else {
          $ctrl.checkoutItems = [];
        }
      }

      function setRejectedCheckoutItems() {
        if(localStorageService.get('rejectedCheckoutItems')){
          $ctrl.rejectedCheckoutItems = localStorageService.get('rejectedCheckoutItems');
        }
        else {
          $ctrl.rejectedCheckoutItems = [];
        }
      }

      function setLatAndLng() {
        if(localStorageService.get('lat') && localStorageService.get('lng')){
          $ctrl.lat = localStorageService.get('lat');
          $ctrl.lng = localStorageService.get('lng');
        }
        else {
          console.log('Ehhh we dont have a lat and lng. Something is wrong... We should request the user for this info!!!')
          $ctrl.lat = 13.37;
          $ctrl.lng = 13.37;
        }
      }
    },
    bindings: {
    }
  });
