'use strict';

angular.module('order.api', [])
  .factory('Order', ['$q', '$http', function ($q, $http) {

    var Order = (function () {
      function Order(domain) {
        this.domain = domain;
      }

      Order.prototype.getOrders = function () {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/orders';
        var url = domain + path;
        var options = {
          method: 'GET',
          url: url
        };

        $http(options).then(function (data) {
            deferred.resolve(data);
          },
          function (data, status, headers, config) {
            deferred.reject({
              status: status,
              headers: headers,
              config: config,
              body: data
            });
          });

        return deferred.promise;
      };

      Order.prototype.createOrder = function (order) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/orders';
        var url = domain + path;
        var options = {
          method: 'POST',
          url: url,
          data: order
        };
        $http(options).then(function (data) {
            deferred.resolve(data);
          },
          function (data, status, headers, config) {
            deferred.reject({
              status: status,
              headers: headers,
              config: config,
              body: data
            });
          });
        return deferred.promise;
      };

      return Order;
    })();

    return Order;
  }]);
