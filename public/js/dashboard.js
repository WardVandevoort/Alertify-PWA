var map = document.querySelector(".map");
var userName = document.querySelector(".name");
var genderIcon = document.querySelector(".gender-icon");
var birthDate = document.querySelector(".birth-date");
var medicalBtn = document.querySelector(".medical-btn");
var medicalInfo = document.querySelector(".medical-information");
var bloodType = document.querySelector(".blood-type");
var allergies = document.querySelector(".allergies");
var medicalConditions = document.querySelector(".medical-conditions");
var medication = document.querySelector(".medication");
var iceBtn = document.querySelector(".ice-btn");
var iceContacts = document.querySelector(".ice-contacts");
var contactBtn = document.querySelector(".contact-btn");
var contactInfo = document.querySelector(".contact-information");
var residence = document.querySelector(".residence");
var animationsContainer = document.querySelector(".animations");

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
          
          GetUserData();
     }

     function GetUserData(){
          var data = {
               user_id: user_id,
          };
     
          fetch("/get_user_data", {
               method: "POST", 
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {  
               ExtractUserData(data);
          }); 
     }

     function ExtractUserData(data){
          if(data.message[0].sex == "Male"){
               genderIcon.style.backgroundImage = "url(../media/img/male_icon.svg)"
          }
          else if(data.message[0].sex == "Female"){
               genderIcon.style.backgroundImage = "url(../media/img/female_icon.svg)"
          }
          userName.innerHTML = data.message[0].first_name + " " + data.message[0].last_name; 
          birthDate.innerHTML = data.message[0].date_of_birth;
          bloodType.innerHTML = data.message[0].medical_info.blood_type;
          allergies.innerHTML = data.message[0].medical_info.allergies;
          medicalConditions.innerHTML = data.message[0].medical_info.medical_conditions;
          medication.innerHTML = data.message[0].medical_info.medication;
          residence.innerHTML = data.message[0].street + " " + data.message[0].street_number + ", " + data.message[0].city + " (" + data.message[0].postal_code + "), " + data.message[0].province;
          
          data.message[0].ice_contacts.forEach(ice_contact => {

               var item = `<div class="ice-contact">
                              <p>First name: ${ice_contact["first_name"]}</p>
                              <p>Last name: ${ice_contact["last_name"]}</p>
                              <p>Tel: ${ice_contact["telephone_number"]}</p>
                              <p>Relation: ${ice_contact["relation"]}</p>
                         </div>`;
          
               iceContacts.insertAdjacentHTML("afterbegin", item);
          });

          GetAnimations();
     }

     async function GetAnimations(){
          var response = await (await fetch("/get_animations")).json();
          var animations = response.message;
     
          animations.forEach( animation => {
               var item = `<a class="animation" href="#">${animation["title"]}</a>`;
          
               animationsContainer.insertAdjacentHTML("afterbegin", item);
          });
     }

});

medicalBtn.addEventListener("click", function(){
     if(medicalInfo.classList.contains("hidden")){
          medicalInfo.classList.remove("hidden");
     }
     else{
          medicalInfo.classList.add("hidden");
     }
});

iceBtn.addEventListener("click", function(){
     if(iceContacts.classList.contains("hidden")){
          iceContacts.classList.remove("hidden");
     }
     else{
          iceContacts.classList.add("hidden");
     }
});

contactBtn.addEventListener("click", function(){
     if(contactInfo.classList.contains("hidden")){
          contactInfo.classList.remove("hidden");
     }
     else{
          contactInfo.classList.add("hidden");
     }
});