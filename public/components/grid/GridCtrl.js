/**
 * @ngdoc controller
 * @name Grid
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular
  .module('uc')
  .controller('GridCtrl', [
    '$scope',
    'points',
    function ($scope, points) {
      $scope.items = points;
    }
  ]);
