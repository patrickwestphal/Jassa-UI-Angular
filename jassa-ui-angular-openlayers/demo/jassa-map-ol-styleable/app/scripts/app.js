'use strict';

angular
  .module('ui.jassa.openlayers.jassa-map-ol-styleable-app', ['ui.jassa.openlayers.jassa-map-ol-styleable'])
  .controller('MainCtrl', function ($scope) {
    $scope.config = {
      center: { lon: 50, lat: 50 },
      zoom: 8
    }
});