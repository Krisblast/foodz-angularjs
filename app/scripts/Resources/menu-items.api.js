'use strict';

angular.module('menu-items.api', [])
  .factory('MenuItem', ['$q', '$http', function ($q, $http) {

    var MenuItem = (function () {
      function MenuItem(domain) {
        this.domain = domain;
      }

      MenuItem.prototype.getAllMenuItems = function (filters, lat, lng) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'items/' + filters + '/' + lat + '/' + lng;
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


      return MenuItem;
    })();

    return MenuItem;
  }]);
