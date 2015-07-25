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
    restrict: 'AE',
    scope: {
      item: '='
    },
    template: '<div ng-include="getTemplateUrl()"></div>',
    // templateUrl: function (element, attrs) {
    //   console.log(element)
    //   console.log(attrs)
    //   return '/components/grid/item/item-' + 'bean' + '.html';
    // },
    link: function (scope) {
      scope.getTemplateUrl = function () {
        return '/components/grid/item/item.html';
      };
      //scope.getTemplateUrl = function () {return '/components/grid/item/item-' + scope.item.type + '.html';}
      //scope.item.added = scope.item.added.substr(0, 10);
    }
  }
});