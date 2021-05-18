var map = document.querySelector(".map");

window.addEventListener("load", function() {
     

     // Make map
     var map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([4.746518399999999, 50.989163]),
            zoom: 17
          })
     });

     var marker = new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([4.746518399999999, 50.989163])
          ), 
     });

     marker.setStyle(new ol.style.Style({
          image: new ol.style.Icon(({
               color: '#E20B17',
               crossOrigin: 'anonymous',
               src: '../media/img/dot.png'
          }))
     }));

     var vectorSource = new ol.source.Vector({
          features: [marker]
     });

     var markerVectorLayer = new ol.layer.Vector({
          source: vectorSource,
     });

     map.addLayer(markerVectorLayer);
     // Finished map
});