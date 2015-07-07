/**
 * Created by Agnislav Onufrijchuk on 07.07.2015.
 */
'use strict';

angular
  .module('uc', [])

  .value('items', [

  ])

  .directive('ucList', ['items', function (items) {
    return {
      template: '<div class="list-container"><div ng-repeat="item in items"></div></div>',
      link: function (scope) {
        scope.items = items;
      }
    }
  }]);