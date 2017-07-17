angular.module('foodzApp')
  .component('moodMain', {
    templateUrl: 'scripts/Mood/mood-component.html',
    controller: function (localStorageService, $http, $location) {
      var $ctrl = this;
      $ctrl.checkoutItems = localStorageService.get('checkoutItems');

      $ctrl.$onInit = function () {
        $ctrl.userCoords = false;
          getUserLocation();
      };

      $ctrl.types = "['geocode']";
      $ctrl.placeChanged = function () {
        $ctrl.place = this.getPlace();
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $ctrl.place.geometry.location.lat() + ',' + $ctrl.place.geometry.location.lng() + '&sensor=true&location_type=APPROXIMATE&key=AIzaSyDt3ke618rd24DZ1MVAlGaHstgyT0egprQ'
        $http({
          method: 'GET', url: url, headers: {'Authorization': undefined}
        }).then(function (resp) {
          $ctrl.userAddress = resp.data.results[0];
          localStorageService.set('lat', $ctrl.userAddress.geometry.location.lat);
          localStorageService.set('lng', $ctrl.userAddress.geometry.location.lng);
        });
      };

      function getUserLocation() {
        if (!navigator.geolocation) {
          $ctrl.userCoords = false;
        }
        function success(position) {

          var lat;
          var lng;

          if (localStorageService.get('lat') && localStorageService.get('lng')) {
            lat = localStorageService.get('lat');
            lng = localStorageService.get('lng');
          }
          else {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
          }

          var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true&location_type=APPROXIMATE&key=AIzaSyDt3ke618rd24DZ1MVAlGaHstgyT0egprQ'
          $http({
            method: 'GET', url: url, headers: {'Authorization': undefined}
          }).then(function (resp) {
            $ctrl.userAddress = resp.data.results[0];
            localStorageService.set('lat', lat);
            localStorageService.set('lng', lng);
          });
          $ctrl.userCoords = position;
        }

        function error() {
          $ctrl.userCoords = false;
        }

        navigator.geolocation.getCurrentPosition(success, error);
      }
    },
    bindings: {}
  });
