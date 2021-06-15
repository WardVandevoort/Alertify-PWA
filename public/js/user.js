var userName = document.querySelector(".name");
var birthDate = document.querySelector(".birth-date");
var sex = document.querySelector(".sex");
var telNumber = document.querySelector(".tel-number");
var email = document.querySelector(".email");
var residence = document.querySelector(".residence");
var bloodType = document.querySelector(".blood-type");
var allergies = document.querySelector(".allergies");
var medicalConditions = document.querySelector(".medical-conditions");
var medication = document.querySelector(".medication");
var iceContacts = document.querySelector(".ice-contacts");

window.addEventListener("load", function(){
     GetUserData();
});

function GetUserData(){
     var url_string = window.location.href;
     var url = new URL(url_string);
     var user_id = url.searchParams.get("id");
          
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
     userName.innerHTML = data.message[0].first_name + " " + data.message[0].last_name; 
     birthDate.innerHTML = data.message[0].date_of_birth;
     sex.innerHTML = data.message[0].sex;
     telNumber.innerHTML = data.message[0].telephone_number;
     email.innerHTML = data.message[0].email;
     bloodType.innerHTML = data.message[0].medical_info.blood_type;
     allergies.innerHTML = data.message[0].medical_info.allergies;
     medicalConditions.innerHTML = data.message[0].medical_info.medical_conditions;
     medication.innerHTML = data.message[0].medical_info.medication;
     residence.innerHTML = data.message[0].street + " " + data.message[0].street_number + ", " + data.message[0].city + "</br> (" + data.message[0].postal_code + "), " + data.message[0].province;
     
     data.message[0].ice_contacts.forEach(ice_contact => {

          var item = `<li class="ice-contact">
                         <p>First name: ${ice_contact["first_name"]}</p>
                         <p>Last name: ${ice_contact["last_name"]}</p>
                         <p>Tel: ${ice_contact["telephone_number"]}</p>
                         <p>Relation: ${ice_contact["relation"]}</p>
                    </li>`;
     
          iceContacts.insertAdjacentHTML("afterbegin", item);
     });
}