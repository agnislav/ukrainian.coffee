/**
 * Created by Agnislav Onufrijchuk on 07.07.2015.
 */
'use strict';

angular
  .module('uc', [])

  .value('items', [
    {
      type: 'roaster',
      name: 'CafeBoutique',
      town: 'Киев',
      description: ''
    }, {
      type: 'roaster',
      name: 'Фунт кофе',
      town: 'Харьков',
      description: ''
    }, {
      type: 'roaster',
      name: 'Мэделин',
      town: 'Ужгород',
      description: ''
    }, {
      type: 'roaster',
      name: 'Тико-Чако',
      town: 'Каменец-Подольский',
      description: ''
    }, {
      type: 'point',
      name: 'Bimbo',
      town: 'Киев',
      description: ''
    }, {
      type: 'point',
      name: '9bar',
      town: 'Киев',
      description: ''
    }
  ])

  .directive('ucList', ['items', function (items) {
    return {
      template: '<div class="list-container"><div ng-repeat="item in items"></div></div>',
      link: function (scope) {
        scope.items = items;
      }
    }
  }]);