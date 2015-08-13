/**
 * @ngdoc directive
 * @name item
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */
angular.module('uc').directive('item', function () {
  //noinspection JSUnusedGlobalSymbols
  return {
    restrict: 'E',
    scope: {
      item: '=',
      template: '='
    },
    //templateUrl: 'components/grid/item/item-coffeepoint.tpl.html'
    template: '<div ng-include="getTemplateUrl()"></div>',
    link: function (scope) {
      scope.getTemplateUrl = function () {
        return '/components/grid/item/item-' + scope.template + '.tpl.html';
      }
    }
  }
});
