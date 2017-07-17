'use strict';

/**
 * @ngdoc service
 * @name foodzApp.restaurantService
 * @description
 * # restaurantService
 * Service in the app.
 */

angular.module('foodzApp')
  .factory('menuItemsService', function ($q, MenuItem, api) {

    var menuItem = new MenuItem(api.domain);

    function getAllMenuItems(filters, lat, lng) {
      return menuItem.getAllMenuItems(filters, lat, lng).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      getAllMenuItems:getAllMenuItems
    };
  });
