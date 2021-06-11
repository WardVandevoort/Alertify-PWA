var container = document.querySelector(".ice-contacts-container");

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
                         <p>First name: ${iceContact["first_name"]}</p>
                         <p>Last name: ${iceContact["last_name"]}</p>
                         <p>Tel: ${iceContact["telephone_number"]}</p>
                         <p>Relation: ${iceContact["relation"]}</p>
                    </div>`;
     
          container.insertAdjacentHTML("afterbegin", item);
     });
     
}
