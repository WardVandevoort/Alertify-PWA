var map = document.querySelector(".map");

window.addEventListener("load", function() {
     var room = sessionStorage.getItem("room");
     var dispatcher_id = sessionStorage.getItem("id");
     var user_id;
     var lat;
     var long;

     GetCallData();
     
     function GetCallData(){
          var data = {
               room: room,
               dispatcher_id: dispatcher_id, 
          };
     
          fetch("/get_current_call", {
               method: "POST", 
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {  
               ExtractCallData(data);
          }); 
     }

     function ExtractCallData(data){
          user_id = data.message[0].user_id;
          lat = data.message[0].lat;
          long = data.message[0].long;

          CreateMap();
     }

     function CreateMap(){
          var map = new ol.Map({
               target: 'map',
               layers: [
                 new ol.layer.Tile({
                   source: new ol.source.OSM()
                 })
               ],
               view: new ol.View({
                 center: ol.proj.fromLonLat([long, lat]),
                 zoom: 17
               })
          });
     
          var marker = new ol.Feature({
               geometry: new ol.geom.Point(
                 ol.proj.fromLonLat([long, lat])
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
     }
});