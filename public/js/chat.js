var sendBtn = document.querySelector(".send-message");
var chatInput = document.querySelector(".chat-input");
var chatContainer = document.querySelector(".chat-container");
var endChat = document.querySelector(".end-call");
var firstNotification = document.querySelector(".first-chat-notification");
var secondNotification = document.querySelector(".second-chat-notification");
var animation = document.querySelector("#animation");

var primus = Primus.connect("/", {
     reconnect: {
         max: Infinity // Number: The max delay before we try to reconnect.
       , min: 500 // Number: The minimum delay before we try reconnect.
       , retries: 10 // Number: How many times we should try to reconnect.
     }
});

primus.on("data", (json) => {
     if(json.action === "Update notification"){
          var targetRoom = json.room;
          var room = sessionStorage.getItem("room");
          if(targetRoom == room){
               firstNotification.classList.add("hidden");
               secondNotification.classList.remove("hidden");
               setTimeout(function(){
                    secondNotification.classList.add("hidden");
               }, 5000)
          }
     }
});

primus.on("data", (json) => {
     if(json.action === "Play animation"){
          var path = json.path;
          var targetRoom = json.room;
          var room = sessionStorage.getItem("room");
          
          if(targetRoom == room){
               animation.classList.remove("hidden");
               animation.src = path;

               animation.addEventListener('ended', function(){
                    animation.classList.add("hidden");
                    animation.src = "";

                    primus.write({
                         "action": "Animation ended",
                         "room": room,
                    });
               });
          }       
     }
});

primus.on("data", (json) => {
     if(json.action === "Stop animation"){

          var path = json.path;
          var targetRoom = json.room;
          var room = sessionStorage.getItem("room");
          if(targetRoom == room){
               animation.classList.add("hidden");
               animation.src = "";  
          }    
     }
});

sendBtn.addEventListener("click", function(){

     UpdateChatMessages();

     chatInput.value = "";
});

function UpdateChatMessages(){
     var data = {
          id: sessionStorage.getItem("id"),
          message: chatInput.value,
          room: sessionStorage.getItem("room"),
     };

     fetch("/update_chat_messages", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })
     .then(res => {
          primus.write({
               "action": "Update chat messages",
               "room": room,
          });

          UpdateView();
     });

}

function UpdateView(){
     var data = {
          room: sessionStorage.getItem("room"),
     };

     fetch("/get_chat", {
          method: "POST", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then(data => {  
          DisplayMessages(data);
     });
}

function DisplayMessages(data){
     chatContainer.innerHTML = "";
     var chats = data.message[0].messages;
     chats.slice().reverse().forEach(chat => {
          if(chat["id"] == sessionStorage.getItem("id")){
               var message = `<div class="message myMessage">
                              <p>${chat["message"]}</p>
                              </div>`;
          }
          else{
               var message = `<div class="message dispatcherMessage">
                              <p>${chat["message"]}</p>
                              </div>`;
          }
          
          chatContainer.insertAdjacentHTML("afterbegin", message);
     });

     chatContainer.scrollTop = chatContainer.scrollHeight;
}

primus.on("data", (json) => {
     if(json.action === "Update chat messages"){

          var targetRoom = json.room;
          var room = sessionStorage.getItem("room");
          if(targetRoom == room){
               UpdateView();
          }    
     }
});

endChat.addEventListener("click", function(){

     var user = sessionStorage.getItem("id");

     var data = {
          user_id: user,
          active: 1
     };

     fetch("/user_ended_chat", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })

     primus.write({
          "action": "Update chats",
     });

     window.location.href = "/";
});