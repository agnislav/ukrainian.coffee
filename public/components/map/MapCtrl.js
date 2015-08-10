/**
 * @ngdoc controller
 * @name Map
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('uc')
  .controller('MapCtrl', ['$scope', '$compile', 'points', 'geolocation', function ($scope, $compile, points, geolocation) {
    $scope.items = points;
    $scope.currentCoordinates = geolocation.coordinates;
    $scope.map = null;
    $scope.pointMarkers = [];
    $scope.markerCurrentPosition = new google.maps.Marker({icon: '/images/marker-current-location.png'});
    var infowindow = new google.maps.InfoWindow();

    $scope.$on('mapInitialized', function(event, evtMap) {
      window.map = evtMap;
      $scope.map = map;

      initCurrentLocation();

      fillMarkers(map);

    });

    function initCurrentLocation () {
      if ($scope.currentCoordinates && $scope.currentCoordinates.latitude && $scope.currentCoordinates.longitude) {
        $scope.markerCurrentPosition.setPosition({lat: $scope.currentCoordinates.latitude, lng: $scope.currentCoordinates.longitude});
        $scope.markerCurrentPosition.setMap($scope.map);
      }
      else {
        $scope.$watch('currentCoordinates', function (newValue) {
          $scope.markerCurrentPosition.setPosition({lat: newValue.latitude, lng: newValue.longitude});
          $scope.markerCurrentPosition.setMap($scope.map);
        }, true);
      }
    }

    function fillMarkers (map) {
      var pointIds = Object.keys(points);

      for (var i = 0, l = pointIds.length; i < l; i++) {
        var pointId = pointIds[i];
        if (points.hasOwnProperty(pointId)) {
          var point = points[pointId];
          point.position = new google.maps.LatLng(point.location.lat, point.location.lng);
          var marker = new google.maps.Marker(point);

          marker.setMap(map);

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(prepareMarkerInfo(this));
            infowindow.open(map, this);
          }.bind(marker));

          $scope.pointMarkers.push(marker);
        }
      }

      google.maps.event.addListener(map, 'click', function() {
        infowindow.close($scope.map, this);
      });
    }

    function prepareMarkerInfo (point) {
      //noinspection UnnecessaryLocalVariableJS
      var info =
            '<div class="info">' +
            '<h1>' + point.title + '</h1>' +
            '<p>' + point.location.address + '</p>' +
            '</div>';

      return info;
    }
  }]);
