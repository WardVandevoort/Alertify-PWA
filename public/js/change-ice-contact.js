var container = document.querySelector(".ice-contacts-container");
var saveBtn = document.querySelector("#save-btn");

window.addEventListener("load", function(){
     GetUserData();
});

function GetUserData(){
     var data = {
          user_id: sessionStorage.getItem("id")
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
          ExtractData(data);
     }); 
}

function ExtractData(data){
     var iceContacts = data.message[0].ice_contacts;

     iceContacts.forEach(iceContact => {

          var item = `<div class="ice-contact">
                         <p>First name: <input type="text" id="fname" value="${iceContact["first_name"]}" placeholder="Joe"></p>
                         <p>Last name: <input type="text" id="lname" value="${iceContact["last_name"]}" placeholder="Doe"></p>
                         <p>Tel: <input type="tel" id="phone" value="${iceContact["telephone_number"]}" placeholder="0123456789"></p>
                         <p>Relation: <input type="text" id="relation" value="${iceContact["relation"]}" placeholder="Spouse"></p>
                         <p class="delete-btn">Delete</p>
                    </div>`;
     
          container.insertAdjacentHTML("afterbegin", item);
     });
     
}

saveBtn.addEventListener("click", function(){
     window.location.href = "/profile/ice-contacts.html";
});