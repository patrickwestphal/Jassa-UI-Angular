'use strict';

Jassa.setOlMapCenter = function(map, config) {
  var zoom = config.zoom;

  var center = config.center;
  var olCenter = null;
  if(center && center.lon != null && center.lat != null) {
    var lonlat = new OpenLayers.LonLat(center.lon, center.lat);
    olCenter = lonlat.clone().transform(map.displayProjection, map.projection);
  }

  if(olCenter != null) {
    map.setCenter(olCenter, zoom);
  }
  else if(zoom != null) {
    map.setZoom(zoom);
  }
};

angular.module('ui.jassa.openlayers.jassa-map-ol-styleable', [])
  .controller('JassaMapOlStyleableCtrl', function($scope){
    //
  })
  .directive('jassaMapOlStyleable', function($parse) {
    return {
      restrict: 'EA',  // TODO: fill
      replace: true,  // TODO: fill
      template: '<div>{{config}}</div>',  // TODO: replace
      controller: 'JassaMapOlStyleableCtrl',
      scope: {
        config: '=', //,
//        sources: '=',  // TODO: adjust
        onSelect: '&select',  // TODO: adjust
        onUnselect: '&unselect'  // TODO: adjust
      },
      link: function (scope, element, attrs) {
        var $el = jQuery(element).ssbMap();
        var widget = $el.data('custom-ssbMap');

        var map = widget.map;
        map.widget = widget;

        console.log(map);
        scope.map = map;

        Jassa.setOlMapCenter(scope.map, scope.config);

        var syncModel = function(event) {
          var tmp = scope.map.getCenter();
          var center = tmp.transform(scope.map.projection, scope.map.displayProjection);

          scope.config.center = {lon: center.lon, lat: center.lat};
          scope.config.zoom = scope.map.getZoom();

          if(!scope.$root.$$phase) {
            scope.$apply();
          }
        };

        $el.on('ssbmapfeatureselect', function(ev, data) {
          scope.onSelect({data: data});
        });

        $el.on('ssbmapfeatureunselect', function(ev, data) {
          scope.onUnselect({data: data});
        });

        map.events.register('moveend', this, syncModel);
        map.events.register('zoomend', this, syncModel);
      }
    };
  });
