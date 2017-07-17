'use strict';

/**
 * @ngdoc service
 * @name foodzApp.orderService
 * @description
 * # orderService
 * Service in the app.
 */

angular.module('foodzApp')
  .factory('orderService', function ($q, Order, api) {

    var order = new Order(api.domain);

    function getOrders() {
      return order.getOrders().then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function createOrder(order_obj) {
      return order.createOrder(order_obj).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      getOrders:getOrders,
      createOrder:createOrder
    };
  });
