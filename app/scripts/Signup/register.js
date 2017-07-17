'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the appApp
 */
angular.module('foodzApp')
  .controller('RegisterCtrl', function ($scope, authService) {

    $scope.newUser={};

    $scope.createUser = function (newUser) {
      authService.createUser(newUser).then(function () {
        $scope.newUser={};
        $scope.errors = null;

      }, function (error) {

        $scope.errors = error.body.data.errors;


      });
    };

  });
