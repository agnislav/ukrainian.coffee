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
        items: '=',
        itemTemplate: '@'
      },
      templateUrl: 'components/grid/grid.tpl.html',
      link: function (scope) {
        //console.log(scope.itemTemplate);
      }
    };
  });
