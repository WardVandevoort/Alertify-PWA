var firstName = document.querySelector("#fname");
var lastName = document.querySelector("#lname");
var telNumber = document.querySelector("#phone");
var relation = document.querySelector("#relation");
var saveBtn = document.querySelector("#save-btn");

saveBtn.addEventListener("click", function(){
     AddIceContact();
});

function AddIceContact(){

     var data = {
          user_id: sessionStorage.getItem("id"),
          first_name: firstName.value,
          last_name: lastName.value, 
          relation: relation.value,
          telephone_number: telNumber.value,
     };

     fetch("/add_ice_contact", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     });

     
     window.location.href = "/profile/ice-contacts.html";
}
