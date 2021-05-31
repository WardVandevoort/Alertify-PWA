var endCall = document.querySelector(".end-call");
var switchCamera = document.querySelector(".switch-camera");
var firstNotification = document.querySelector(".first-notification");
var secondNotification = document.querySelector(".second-notification");
var animation = document.querySelector("#animation");

var primus = Primus.connect("/", {
     reconnect: {
         max: Infinity // Number: The max delay before we try to reconnect.
       , min: 500 // Number: The minimum delay before we try reconnect.
       , retries: 10 // Number: How many times we should try to reconnect.
     }
});

endCall.addEventListener("click", function(){
     primus.write({
          "action": "User ended call",
     });

     primus.write({
          "action": "Update calls",
     });

     window.location.href = "/";
});

switchCamera.addEventListener("click", function(){
     primus.write({
          "action": "Switch camera",
     });
});

primus.on("data", (json) => {
     if(json.action === "Update notification"){
          firstNotification.classList.add("hidden");
          secondNotification.classList.remove("hidden");
          setTimeout(function(){
               secondNotification.classList.add("hidden");
          }, 5000)
     }
});

primus.on("data", (json) => {
     if(json.action === "Play animation"){
          var path = json.path;
          animation.classList.remove("hidden");
          animation.src = path;

          animation.addEventListener('ended', function(){
               animation.classList.add("hidden");
               animation.src = "";

               primus.write({
                    "action": "Animation ended",
               });
          });
               
     }
});

primus.on("data", (json) => {
     if(json.action === "Stop animation"){
          var path = json.path;
          animation.classList.add("hidden");
          animation.src = "";      
     }
});
