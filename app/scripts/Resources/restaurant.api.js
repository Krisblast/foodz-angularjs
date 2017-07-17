'use strict';

angular.module('restaurant.api', [])
  .factory('Restaurant', ['$q', '$http', function ($q, $http) {

    var Restaurant = (function () {
      function Restaurant(domain) {
        this.domain = domain;
      }

      Restaurant.prototype.getRestaurantItemsById = function (restaurant_id) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restaurants/' + restaurant_id + '/items';
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

      Restaurant.prototype.getAllRestaurants = function () {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restaurants';
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


      return Restaurant;
    })();

    return Restaurant;
  }]);
