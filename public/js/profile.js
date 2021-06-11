var firstName = document.querySelector("#first-name");
var lastName = document.querySelector("#last-name");
var dateOfBirth = document.querySelector("#date-of-birth");
var sex = document.querySelector("#sex");
var tel = document.querySelector("#tel");
var email = document.querySelector("#email");
var street = document.querySelector("#street");
var streetNumber = document.querySelector("#street-number");
var city = document.querySelector("#city");
var postalCode = document.querySelector("#postal-code");
var province = document.querySelector("#province");

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
     firstName.innerHTML = data.message[0].first_name;
     lastName.innerHTML = data.message[0].last_name;
     dateOfBirth.innerHTML = data.message[0].date_of_birth;
     sex.innerHTML = data.message[0].sex;
     tel.innerHTML = data.message[0].telephone_number;
     email.innerHTML = data.message[0].email;
     street.innerHTML = data.message[0].street;
     streetNumber.innerHTML = data.message[0].street_number;
     city.innerHTML = data.message[0].city;
     postalCode.innerHTML = data.message[0].postal_code;
     province.innerHTML = data.message[0].province;
}
