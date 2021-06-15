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
var toggleVideo = document.querySelector(".toggle-video");
var video = document.querySelector("#remoteVideo");
var eyeIcon = document.querySelector(".eye-icon");
var videoContainer = document.querySelector(".video-container");
var stopBtn = document.querySelector(".stop-btn");
var animationNotification = document.querySelector(".animation-notification");
var animationName = document.querySelector(".animation-name");
var animationStopped = document.querySelector(".animation-stopped");
var animationEnded = document.querySelector(".animation-ended");
var userInfo = document.querySelector(".user-info");
var userLeft = document.querySelector(".user-left-call");
var endCall = document.querySelector(".end-call");
var notesBtn = document.querySelector(".notes-btn");
var notesContainer = document.querySelector(".notes-container");
var notes = document.querySelector(".notes");

var primus = Primus.connect("/", {
     reconnect: {
         max: Infinity // Number: The max delay before we try to reconnect.
       , min: 500 // Number: The minimum delay before we try reconnect.
       , retries: 10 // Number: How many times we should try to reconnect.
     }
});

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

          map.getControls().forEach(function(control) {
               if(control instanceof ol.control.Zoom) {
                    map.removeControl(control);
               }

               if(control instanceof ol.control.Rotate) {
                    map.removeControl(control);
               }

               if(control instanceof ol.control.Attribution) {
                    map.removeControl(control);
               }
          }, this);
     
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
          if(user_id == null || user_id == "" || user_id == "undefined"){
               NoUserData();
          }
          else{
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
     }

     function ExtractUserData(data){
          if(data.message[0].sex == "Male"){
               genderIcon.src = "../media/img/male_icon.svg"
          }
          else if(data.message[0].sex == "Female"){
               genderIcon.src = "../media/img/female_icon.svg"
          }
          userName.innerHTML = data.message[0].first_name + " " + data.message[0].last_name; 
          birthDate.innerHTML = data.message[0].date_of_birth;
          bloodType.innerHTML = data.message[0].medical_info.blood_type;
          allergies.innerHTML = data.message[0].medical_info.allergies;
          medicalConditions.innerHTML = data.message[0].medical_info.medical_conditions;
          medication.innerHTML = data.message[0].medical_info.medication;
          residence.innerHTML = data.message[0].street + " " + data.message[0].street_number + ", " + data.message[0].city + "</br> (" + data.message[0].postal_code + "), " + data.message[0].province;
          
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

     function NoUserData(){
          
          userInfo.classList.add("hidden");
          
          GetAnimations();
     }

     async function GetAnimations(){
          var response = await (await fetch("/get_animations")).json();
          var animations = response.message;
     
          animations.forEach( animation => {
               var item = `<a class="animation" path="${animation["path"]}" name="${animation["title"]}" href="#">${animation["title"]}</a>`;
          
               animationsContainer.insertAdjacentHTML("afterbegin", item);
          });

          PlayAnimation();
     }

     function PlayAnimation(){
          var animations = document.querySelectorAll(".animation");
          animations.forEach(
               animation => animation.addEventListener("click", function(){
                    animationNotification.classList.remove("hidden");
                    animationName.innerHTML = '"' + animation.getAttribute("name") + '"';

                    primus.write({
                         "action": "Play animation",
                         "path": animation.getAttribute("path"),
                         "room": room,
                    });
               })
          )
     }

});

medicalBtn.addEventListener("click", function(){
     if(medicalInfo.classList.contains("hidden")){
          medicalInfo.classList.remove("hidden");
          medicalBtn.style.backgroundImage = "url(../../media/img/arrow-up-icon.svg)";
     }
     else{
          medicalInfo.classList.add("hidden");
          medicalBtn.style.backgroundImage = "url(../../media/img/arrow-down-icon.svg)";
     }
});

iceBtn.addEventListener("click", function(){
     if(iceContacts.classList.contains("hidden")){
          iceContacts.classList.remove("hidden");
          iceBtn.style.backgroundImage = "url(../../media/img/arrow-up-icon.svg)";
     }
     else{
          iceContacts.classList.add("hidden");
          iceBtn.style.backgroundImage = "url(../../media/img/arrow-down-icon.svg)";
     }
});

contactBtn.addEventListener("click", function(){
     if(contactInfo.classList.contains("hidden")){
          contactInfo.classList.remove("hidden");
          contactBtn.style.backgroundImage = "url(../../media/img/arrow-up-icon.svg)";
     }
     else{
          contactInfo.classList.add("hidden");
          contactBtn.style.backgroundImage = "url(../../media/img/arrow-down-icon.svg)";
     }
});

toggleVideo.addEventListener("click", function(){
     if(videoContainer.classList.contains("hidden")){
          videoContainer.classList.remove("hidden");
          video.classList.remove("small-video");
          video.classList.add("user-video");
          eyeIcon.src = "../media/img/eye-open-icon.svg";
     }
     else{
          videoContainer.classList.add("hidden");
          video.classList.remove("user-video");
          video.classList.add("small-video");
          eyeIcon.src = "../media/img/eye-closed-icon.svg";
     }
});

video.addEventListener("click", function(){
     if(videoContainer.classList.contains("hidden")){
          videoContainer.classList.remove("hidden");
          video.classList.remove("small-video");
          video.classList.add("user-video");
          eyeIcon.src = "../media/img/eye-open-icon.svg";
     }
     else{
          videoContainer.classList.add("hidden");
          video.classList.remove("user-video");
          video.classList.add("small-video");
          eyeIcon.src = "../media/img/eye-closed-icon.svg";
     }
});

notesBtn.addEventListener("click", function(){
     if(notesContainer.classList.contains("hidden")){
          notesContainer.classList.remove("hidden");
     }
     else{
          notesContainer.classList.add("hidden");
     }
});

stopBtn.addEventListener("click", function(){
     animationNotification.classList.add("hidden");
     animationStopped.classList.remove("hidden");
          setTimeout(function(){
               animationStopped.classList.add("hidden");
          }, 3000) 

     primus.write({
          "action": "Stop animation",
          "room": sessionStorage.getItem("room"),
     });
})

primus.on("data", (json) => {
     if(json.action === "Animation ended"){
          if(json.room == sessionStorage.getItem("room")){
               animationNotification.classList.add("hidden"); 
               animationEnded.classList.remove("hidden");
               setTimeout(function(){
                    animationEnded.classList.add("hidden");
               }, 3000) 
          }   
     }
});

primus.on("data", (json) => {
     if(json.action === "User left call"){
          if(json.room == sessionStorage.getItem("room")){
               userLeft.classList.remove("hidden");
          }   
     }
});

endCall.addEventListener("click", function(){
     var data = {
          notes: notes.value,
          room: sessionStorage.getItem("room"),
     };

     fetch("/update_call_notes", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })

     primus.write({
          "action": "Dispatcher left call",
          "room": sessionStorage.getItem("room"),
     });
});