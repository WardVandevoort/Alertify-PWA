var endCall = document.querySelector(".end-call");
var switchCamera = document.querySelector(".switch-camera");
var primus = Primus.connect("/", {
     reconnect: {
         max: Infinity // Number: The max delay before we try to reconnect.
       , min: 500 // Number: The minimum delay before we try reconnect.
       , retries: 10 // Number: How many times we should try to reconnect.
     }
});

endCall.addEventListener("click", function(){
     window.location.href = "/";
});

switchCamera.addEventListener("click", function(){
     primus.write({
          "action": "Switch camera",
     });
});
