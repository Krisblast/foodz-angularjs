'use strict';

angular.module('auth.api', [])
  .factory('Auth', ['$q', '$http', function ($q, $http) {

    var Auth = (function () {
      function Auth(domain) {
        this.domain = domain;
      }

      Auth.prototype.loginUser = function (user) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'login';

        var url = domain + path;

        var options = {
          method: 'POST',
          url: url,
          data: user
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

      Auth.prototype.logoutUser = function () {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/logout';

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



      Auth.prototype.createUser = function (newUser) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'register';

        var url = domain + path;

        var options = {
          method: 'POST',
          url: url,
          data: newUser
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


      return Auth;
    })();

    return Auth;
  }]);
