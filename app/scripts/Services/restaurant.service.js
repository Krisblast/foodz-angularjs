'use strict';

/**
 * @ngdoc service
 * @name foodzApp.restaurantService
 * @description
 * # restaurantService
 * Service in the app.
 */

angular.module('foodzApp')
  .factory('restaurantService', function ($q, Restaurant, api) {

    var restaurant = new Restaurant(api.domain);

    function getRestaurantItemsById(restaurant_id) {
      return restaurant.getRestaurantItemsById(restaurant_id).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function getAllRestaurants() {
      return restaurant.getAllRestaurants().then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      getRestaurantItemsById:getRestaurantItemsById,
      getAllRestaurants:getAllRestaurants
    };
  });
