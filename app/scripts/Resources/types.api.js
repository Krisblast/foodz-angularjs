'use strict';

angular.module('types.api', [])
  .factory('Types', ['$q', '$http', function ($q, $http) {

    var Types = (function () {
      function Types(domain) {
        this.domain = domain;
      }

      Types.prototype.getAllTypes = function () {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'types';
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

      Types.prototype.createNewType = function (type) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/types';
        var url = domain + path;
        var options = {
          method: 'POST',
          url: url,
          data: type
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

      return Types;
    })();

    return Types;
  }]);
