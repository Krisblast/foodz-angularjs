'use strict';

/**
 * @ngdoc service
 * @name foodzApp.typesService
 * @description
 * # typesService
 * Service in the app.
 */

angular.module('foodzApp')
  .factory('typesService', function ($q, Types, api) {
    var types = new Types(api.domain);

    function getAllTypes() {
      return types.getAllTypes().then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function createNewType(type) {
      return types.createNewType(type).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      getAllTypes:getAllTypes,
      createNewType:createNewType
    };
  });
