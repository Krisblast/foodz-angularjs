'use strict';

/**
 * @ngdoc service
 * @name foodzApp.authService
 * @description
 * # authService
 * Service in the app.
 */

angular.module('foodzApp')
  .factory('authService', function ($q, Auth, api) {

    var auth = new Auth(api.domain);

    function loginUser(user) {
      return auth.loginUser(user).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function logoutUser() {
      return auth.logoutUser().then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function createUser(newUser) {
      return auth.createUser(newUser).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      loginUser:loginUser,
      logoutUser:logoutUser,
      createUser:createUser
    };
  });
