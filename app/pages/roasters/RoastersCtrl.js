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
  .controller('RoastersCtrl', [
    '$scope',
    'roasters',
    function ($scope, roasters) {
      $scope.roasters = roasters;
    }
  ]);
