var container = document.querySelector("#calls-container");

var primus = Primus.connect("/", { 
     reconnect: {
         max: Infinity // Number: The max delay before we try to reconnect.
       , min: 500 // Number: The minimum delay before we try reconnect.
       , retries: 10 // Number: How many times we should try to reconnect.
     }
});

window.addEventListener("load", function() {
     LiveUpdate();
     ClickCall();
});

primus.on("data", (json) => {
     if(json.action === "Update calls"){
          LiveUpdate();
          ClickCall();
     }
});

setInterval(function(){
     LiveUpdate();
     ClickCall();
}, 30000);

async function LiveUpdate() {
     var response = await (await fetch("/show_active_calls")).json();
     var calls = response.message;

     // Empty calls container before filling it
     container.innerHTML = "";
     
     calls.slice().reverse().forEach(call => {
          var callTimestamp = call['created_at'];
          var callDate = new Date(callTimestamp);
          var callTime = callDate.getTime() / 1000;

          var today = new Date();
          var currentTime = today.getTime() / 1000;

          var sum = currentTime - callTime;
          var timeSince = Math.round(sum);
          var time;

          switch (true) {
               case (timeSince < 30):
                    time = "Call started just now";
                    break;

               case (timeSince >= 30 && timeSince < 60):
                    time = "Call started 30 seconds ago";
                    break;
          
               case (timeSince >= 60 && timeSince < 90):
                    time = "Call started 1 minute ago";
                    break;

               case (timeSince >= 90 && timeSince < 120):
                    time = "Call started 1.5 minute ago";
                    break;

               case (timeSince >= 120 && timeSince < 150):
                    time = "Call started 2 minutes ago";
                    break;

               case (timeSince >= 150 && timeSince < 180):
                    time = "Call started 2.5 minutes ago";
                    break;

               case (timeSince >= 180 && timeSince < 210):
                    time = "Call started 3 minutes ago";
                    break;

               case (timeSince >= 210 && timeSince < 240):
                    time = "Call started 3.5 minutes ago";
                    break;

               case (timeSince >= 240 && timeSince < 270):
                    time = "Call started 4 minutes ago";
                    break;

               case (timeSince >= 270 && timeSince < 300):
                    time = "Call started 4.5 minutes ago";
                    break;

               case (timeSince >= 300 && timeSince < 330):
                    time = "Call started 5 minutes ago";
                    break;

               case (timeSince >= 330 && timeSince < 360):
                    time = "Call started 5.5 minutes ago";
                    break;

               case (timeSince >= 360 && timeSince < 390):
                    time = "Call started 6 minutes ago";
                    break;

               case (timeSince >= 390 && timeSince < 420):
                    time = "Call started 6.5 minutes ago";
                    break;

               case (timeSince >= 420 && timeSince < 450):
                    time = "Call started 7 minutes ago";
                    break;

               case (timeSince >= 450 && timeSince < 480):
                    time = "Call started 7.5 minutes ago";
                    break;

               case (timeSince >= 480 && timeSince < 510):
                    time = "Call started 8 minutes ago";
                    break;

               case (timeSince >= 510 && timeSince < 540):
                    time = "Call started 8.5 minutes ago";
                    break;

               case (timeSince >= 540 && timeSince < 570):
                    time = "Call started 9 minutes ago";
                    break;

               case (timeSince >= 570 && timeSince < 600):
                    time = "Call started 9.5 minutes ago";
                    break;

               case (timeSince >= 600 && timeSince < 630):
                    time = "Call started 10 minutes ago";
                    break;

               case (timeSince >= 630):
                    time = "Call started 10+ minutes ago";
                    break;
          }

          var listItem = `<li class="call">
                              <a href="/dispatcher/dashboard?id=${call['_id']}&room=${call['room']}">
                                   <img src="../media/img/call_btn.svg" alt="phone icon">
                                   <p>${time}</p>
                              </a>
                         </li>`;
          
          container.insertAdjacentHTML("afterbegin", listItem);
     });
}




