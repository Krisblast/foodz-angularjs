'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('foodzApp')
  .controller('LoginCtrl', function ($scope, $window, authService, $http) {

    $scope.userCreds = {};

    function saveToken(token) {
      $window.localStorage.jwtToken = token;
    }

    $scope.loginUser = function (user) {
      authService.loginUser(user).then(function (response) {
        saveToken(response.token);
        $window.location.reload();
      });
    };


    $scope.logoutUser = function () {
      authService.logoutUser().then(function () {
        console.log('logout success');
        saveToken(null);
        $window.location.reload();
      });
    };

  });
