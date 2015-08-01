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
  .controller('MapCtrl', ['$scope', '$compile', 'points', function ($scope, $compile, points) {
    $scope.items = points;
    $scope.map = null;
    $scope.pointMarkers = [];
    var infowindow = new google.maps.InfoWindow();

    $scope.$on('mapInitialized', function(event, evtMap) {
      var pointIds = Object.keys(points);
      window.map = evtMap;
      $scope.map = map;
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
        infowindow.close(map, this);
      });

    });

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
