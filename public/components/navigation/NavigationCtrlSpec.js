describe('Controller: uc.Navigation', function () {

  // load the controller's module
  beforeEach(angular.module('uc'));

  var ctrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl  = $controller('Navigation', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(ctrl).toBeDefined();
  });
});
