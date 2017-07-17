'use strict';

/**
 * @ngdoc overview
 * @name foodzApp
 * @description
 * # foodzApp
 *
 * Main module of the application.
 */
angular
  .module('foodzApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngRoute',
    'ui.bootstrap',
    'LocalStorageModule',
    'angular-underscore',
    'auth.api',
    'order.api',
    'restaurant.api',
    'types.api',
    'menu-items.api',
    'ngMap'
  ])
  .value('api', {
    domain: 'http://homestead.app/api/'
  })
  .config(function ($locationProvider, localStorageServiceProvider,$routeProvider) {
    // HTML5 PUSH STATE
    $locationProvider.html5Mode(true).hashPrefix('!');
    localStorageServiceProvider.setPrefix('foodSwipe');

    $routeProvider
      .when('/', {
        template: '<dashboard-main></dashboard-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'home';
          }
        }
      })
      .when('/mood', {
        template: '<mood-main></mood-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'mood';
          }
        },
        reloadOnSearch:false
      })
      .when('/usual', {
        template: '<usual-main></usual-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'usual';
          }
        }
      })
      .when('/picker', {
        template: '<picker-main></picker-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'picker';
          }
        },
        reloadOnSearch:false
      })
      .when('/checkout', {
        template: '<checkout-main></checkout-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'checkout';
          }
        },
        reloadOnSearch:false
      })
      .when('/order', {
        template: '<order-main></order-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'order';
          }
        }
      })
      .when('/orders', {
        template: '<orders-main></orders-main>',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = 'orders';
          }
        }
      })
      .when('/login', {
        templateUrl: 'scripts/Signup/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage =  null;
          }
        }
      })
      .when('/register', {
        templateUrl: 'scripts/Signup/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage =  null;
          }
        }
      })
      .when('/404', {
        template: '<picker-main></picker-main>',
        templateUrl: 'views/404.html',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage = '404';
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

  })  //TODO Make some magic with redirect route on unauth
  .run(function ($http,$window,$rootScope, $location) {
    //TODO Move this somewhere else
    $rootScope.globalLoading = true;
    if($window.localStorage.jwtToken){
      $http.defaults.headers.common.Authorization = 'Bearer ' + $window.localStorage.jwtToken;
      $http.get('http://homestead.app/api/restricted/user').then(function (response) {
        $rootScope.user = response;
        $rootScope.globalLoading = false;
      }, function () {
        console.log('no user');
        $location.path('/login');
        $rootScope.globalLoading = false;
      });
    }
  });
