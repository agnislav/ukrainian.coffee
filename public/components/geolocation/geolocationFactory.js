angular.module('uc')
  .factory('geolocation', function () {
    var factory = {},
        coordinates, lastUpdated;

    function init () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(_saveCoordinates);
      }
    }

    function _saveCoordinates (position) {
      coordinates = position.coords;
      lastUpdated = position.timestamp;
    }


    factory = {
      init: init
    };

    Object.defineProperty(factory, 'coordinates', {
      get: function () {
        return coordinates;
      }
    });

    return factory;
  });
