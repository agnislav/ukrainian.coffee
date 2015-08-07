/**
 * Created by Agnislav Onufrijchuk on 25.07.2015.
 */
'use strict';

angular
  .module('uc', ['ngRoute', 'ngSanitize', 'ngMap', 'templates'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {templateUrl: '/components/coffeepoints/coffeepoints.html', controller: 'CoffeePointsCtrl'})
      //.when('/beans', {templateUrl: '/components/grid/grid.html', controller: 'GridCtrl', resolve: {type: 'bean'}})
      //.when('/roasters', {templateUrl: '/components/grid/grid.html', controller: 'GridCtrl', resolve: {type: 'roaster'}})
      //.when('/roasters/:id', {templateUrl: 'roaster.html', controller: 'RoasterCtrl'})
      //.when('/roasters/:id/:bean', {templateUrl: 'bean.html', controller: 'BeanCtrl'})
      //.when('/coffeepoints/:id', {templateUrl: 'point.html', controller: 'PointCtrl'})
      .when('/map', {templateUrl: '/components/map/map.html', controller: 'MapCtrl'})
      .otherwise({redirectTo: '/ukrainian.coffee'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }]);

// needed for templateCache
angular.module('templates', []);
