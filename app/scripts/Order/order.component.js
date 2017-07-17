angular.module('foodzApp')
  .component('orderMain', {
    templateUrl: 'scripts/Order/order.template.html',
    controller: function ($http, orderService, restaurantService, typesService) {
      var $ctrl = this;

      $ctrl.$onInit = function () {
        $ctrl.restaurant = null;
        $ctrl.restaurantType = null;
        $ctrl.newOrder = {};
        getRestaurants();
        getAllTypes();
      };

      $ctrl.getOrders = function () {
        orderService.getOrders().then(function (resp) {
        }, function (error) {
          console.log('error', error)
        });
      };

      function getRestaurants() {
        restaurantService.getAllRestaurants().then(function (resp) {
          $ctrl.restaurants = resp.data; //???
        }, function (error) {
          console.log('error', error)
        })
      }

      function getAllTypes() {
        typesService.getAllTypes().then(function (resp) {
          $ctrl.allTypes = resp.data; //???
        }, function (error) {
          console.log('error', error)
        })
      }

      $ctrl.types = "['geocode']";
      $ctrl.placeChanged = function () {
        $ctrl.place = this.getPlace();
      };

      $ctrl.isNewItemTypeObject = function (newItemType) {
        return angular.isArray(newItemType)
      };

      $ctrl.createOrder = function (newOrder, orderMenuItems) {
        var order = {
          restaurant_id: $ctrl.restaurant.id,
          menu_items: [],
          title: newOrder.title
        };
        angular.forEach(orderMenuItems, function (item) {
          order.menu_items.push(item.data.id)
        });
        order.menu_items = String(order.menu_items);

        orderService.createOrder(order).then(function () {
          $ctrl.newOrder = {};
          $ctrl.orderMenuItems = [];
          $ctrl.restaurant = null;
        }, function (errorResp) {
          $ctrl.errors = errorResp.errors;
        });
      };

      $ctrl.showNewRestaurant = null;
      $ctrl.getItemsForRestaurant = function ($item) {
        $ctrl.showNewRestaurant = false;
        restaurantService.getRestaurantItemsById($item.id).then(function (resp) {
          $ctrl.restaurantMenuItems = resp.data;
          $ctrl.orderMenuItems.push({
            name: '',
            type: null,
            price: null,
            image: null,
            restaurant_id: $ctrl.restaurant.id,
            showNewMenuItem: null,
            data: null
          })
        }, function () {
          console.log('error getting restaurant items')
        });
      };

      $ctrl.clearMenuItems = function () {
        $ctrl.restaurantMenuItems = null;
        $ctrl.orderMenuItems = [];
      };

      $ctrl.isThisAKnownRestaurant = function ($item) {
        $ctrl.showNewRestaurant = !angular.isObject($item) && $item !== undefined;
      };

      $ctrl.showNewMenuItem = false;
      $ctrl.isThisAKnownMenuItem = function ($item) {
        $item.showNewMenuItem = !angular.isObject($item.data);
      };

      $ctrl.orderMenuItems = [];

      $ctrl.addNewMenuItem = function () {
        $ctrl.orderMenuItems.push({
          name: '',
          type: null,
          price: null,
          image: null,
          restaurant_id: $ctrl.restaurant.id,
          showNewMenuItem: null,
          data: null
        })
      };
      $ctrl.removeMenuItem = function ($index) {
        $ctrl.orderMenuItems.slice($index, 1)
      };

      $ctrl.createNewTypeAndRestaurant = function (restaurant, title) {
        var type = {
          title: title
        };
        typesService.createNewType(type).then(function (resp) {
          $ctrl.restaurantType = resp.data;
          $ctrl.confirmNewRest(restaurant, resp.data.id);
        }, function (error) {

        })
      };

      $ctrl.isThisAnObject = function (item) {
        return angular.isObject(item);
      };

      $ctrl.isPlaceValid = function () {
        return angular.isObject($ctrl.place);
      };

      $ctrl.confirmNewRest = function (name, type) {
        var obj = {
          name: name,
          type: type,
          lat: $ctrl.place.geometry.location.lat(),
          lng: $ctrl.place.geometry.location.lng()
        };
        $http.post('http://homestead.app/api/restricted/restaurants', obj).then(function (respOne) {
          $http.get('http://homestead.app/api/restaurants').then(function (resp) {
            $ctrl.restaurantType = undefined;
            $ctrl.restaurants = resp.data.data; //???            $ctrl.newOrder = {};
            $ctrl.restaurant = respOne.data.data;
            $ctrl.isThisAKnownRestaurant($ctrl.restaurant);
            $ctrl.orderMenuItems.push({
              name: '',
              type: null,
              price: null,
              image: null,
              restaurant_id: $ctrl.restaurant.id,
              showNewMenuItem: null,
              data: null
            })
          }, function () {
            console.log('error getting restaurants')
          });
        }, function () {
          console.log('error post restaurants')
        })
      };

      $ctrl.confirmNewMenuItem = function (item) {
        var obj = {
          name: item.name,
          type: item.type,
          price: item.price,
          image: 'image',
          restaurant_id: item.restaurant_id
        };
        $http.post('http://homestead.app/api/restricted/items', obj).then(function (itemsRsp) {
          $http.get('http://homestead.app/api/restaurants/' + item.restaurant_id + '/items').then(function (resp) {
            item.data = itemsRsp.data.data;
            $ctrl.restaurantMenuItems = resp.data.data;
            $ctrl.isThisAKnownMenuItem(item);
          }, function () {
            console.log('error restaurants')
          })
        }, function () {
          console.log('error items')
        });
      };

      $ctrl.selectedItemType = function (item, selectedType) {
        item.type = selectedType.id;
      };

      $ctrl.confirmNewTypeAndMenuItem = function (item, newItemType) {

        var type = {
          title: newItemType
        };

        typesService.createNewType(type).then(function (resp) {
          item.type = resp.data.id;
          $ctrl.confirmNewMenuItem(item);
        }, function (error) {
        });
      };


      $ctrl.getOrders();


    },
    bindings: {}
  });

