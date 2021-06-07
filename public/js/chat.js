var sendBtn = document.querySelector(".send-message");
var chatInput = document.querySelector(".chat-input");
var chatContainer = document.querySelector(".chat-container");

sendBtn.addEventListener("click", function(){

     UpdateChatMessages();

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
          .then(res => {UpdateView()});

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
     }

     chatInput.value = "";
});