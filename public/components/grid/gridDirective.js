/**
 * @ngdoc directive
 * @name gird
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */
angular.module('uc')
  .directive('grid', function () {
    return {
      restrict: 'E',
      scope: {
        items: '='
      },
      templateUrl: '/components/grid/grid.html'
    };
  });
