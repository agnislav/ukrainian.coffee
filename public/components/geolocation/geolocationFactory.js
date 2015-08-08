angular.module('uc')
  .factory('geolocation', function () {
    var coordinates, lastUpdated;

    function init () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(_saveCoordinates);
      }
    }

    function _saveCoordinates (position) {
      coordinates = position.coords;
      lastUpdated = position.timestamp;
    }

    return {
      init: init,
      coordinates: coordinates
    };
  });
