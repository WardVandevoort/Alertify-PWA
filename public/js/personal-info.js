var firstName = document.querySelector("#fname");
var lastName = document.querySelector("#lname");
var dateOfBirth = document.querySelector("#bdate");
var sex = document.querySelector("#sex");
var tel = document.querySelector("#phone");
var email = document.querySelector("#email");
var street = document.querySelector("#street");
var streetNumber = document.querySelector("#snumber");
var city = document.querySelector("#city");
var postalCode = document.querySelector("#postal");
var province = document.querySelector("#state");
var saveBtn = document.querySelector("#save-btn");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#cpassword");
var passwordError = document.querySelector("#password-error");
var emailError = document.querySelector("#email-error");
var oldEmail;

var p_value = null;
var e_value = null;

window.addEventListener("load", function(){
     GetUserData();
});

saveBtn.addEventListener("click", function(){
     CheckPassword();
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
     firstName.value = data.message[0].first_name;
     lastName.value = data.message[0].last_name;
     dateOfBirth.value = data.message[0].date_of_birth;
     sex.value = data.message[0].sex;
     tel.value = data.message[0].telephone_number;
     email.value = data.message[0].email;
     oldEmail = data.message[0].email;
     street.value = data.message[0].street;
     streetNumber.value = data.message[0].street_number;
     city.value = data.message[0].city;
     postalCode.value = data.message[0].postal_code;
     province.value = data.message[0].province;
}

function CheckPassword(){
     if(password.value != ""){
          var passwordLength = password.value.length;
          var containsNumber = password.value.match(/\d+/g);
          if(passwordLength >= 6 && containsNumber != null) {
               password.classList.remove("error");
               confirmPassword.classList.remove("error");
               passwordError.innerHTML = "";
     
               if(password.value == confirmPassword.value){
                    p_value = password.value;
                    password.classList.remove("error");
                    confirmPassword.classList.remove("error");
                    passwordError.innerHTML = "";
                    CheckEmail();
               }
               else{
                    password.classList.add("error");
                    confirmPassword.classList.add("error");
                    passwordError.innerHTML = "Password and confirm password must both be filled in and they must match";
               }
          }
          else{
               password.classList.add("error");
               confirmPassword.classList.add("error");
               passwordError.innerHTML = "Password must be atleast 6 characters long and contain a number";
          }
     }
     else{
          CheckEmail();
     }
}

function CheckEmail(){
     if(email.value != oldEmail){
          if(email.value.indexOf("@") != -1 && email.value.indexOf(".") != -1){
               emailError.innerHTML = "";
               var data = {
                    email: email.value, 
               };
          
               fetch("/email_check", {
                    method: "POST", 
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
               })
               .then(res => res.json())
               .then(data => {  
                    EmailExistsCheck(data);
               }); 
          }
          else{
               email.classList.add("error");
               emailError.innerHTML = "Email must contain an '@' and a '.'";
          }
     }
     else{
          UpdateUserData();
     }
}

function EmailExistsCheck(data){
     if(data.message.length != 0){
          email.classList.add("error");
          emailError.innerHTML = "Email address already exists, please use a different email";
     }
     else{
          e_value = email.value;
          email.classList.remove("error");
          emailError.innerHTML = "";
          UpdateUserData();
     }
}

function UpdateUserData(){

     var data = {
          user_id: sessionStorage.getItem("id"),
          password: p_value,
          email: e_value, 
          first_name: firstName.value,
          last_name: lastName.value,
          date_of_birth: dateOfBirth.value,
          sex: sex.value,
          telephone_number: tel.value,
          street: street.value,
          street_number: streetNumber.value,
          city: city.value,
          postal_code: postalCode.value,
          province: province.value,
     };

     fetch("/update_user_data", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     });

     if(email.classList.contains("error") == false && password.classList.contains("error") == false){
          window.location.href = "/profile.html";
     }
}
