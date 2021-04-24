
var submit = document.querySelector(".submit");
var firstName = document.querySelector("#first_name");
var lastName = document.querySelector("#last_name");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm_password");

var fn_value = false;
var ln_value = false;
var e_value = false;
var p_value = false;

submit.addEventListener("click", function(){

     // Start validation chain
     FirstName();

     // First name validation
     function FirstName(){
          if(firstName.value != '' && firstName.value != ' '){
               fn_value = firstName.value;
               firstName.classList.remove("error");
          }
          else{
               firstName.classList.add("error");
          }

          LastName();
     }

     // Last name validation
     function LastName(){
          if(lastName.value != '' && lastName.value != ' '){
               ln_value = lastName.value;
               lastName.classList.remove("error");
          }
          else{
               lastName.classList.add("error");
          }

          Email();
     }

     // Email validation
     function Email(){
          if(email.value.indexOf("@") != -1 && email.value.indexOf(".") != -1){
               var data = {
                    email: email.value, 
               };
          
               fetch("http://localhost:8000/email_check", {
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
          }
     }
     
     function EmailExistsCheck(data){
          if(data.message.length != 0){
               e_value = false;
               email.classList.add("error");
          }
          else{
               e_value = email.value;
               email.classList.remove("error");
          }

          Password();
     }

     // Password validation (encryption happens on server side)
     function Password(){
          var passwordLength = password.value.length;
          var containsNumber = password.value.match(/\d+/g);
          if(passwordLength >= 6 && containsNumber != null && password.value != '' && password.value != ' ') {
               password.classList.remove("error");

               if(password.value == confirmPassword.value){
                    p_value = password.value;
                    password.classList.remove("error");
                    confirmPassword.classList.remove("error");
               }
               else{
                    password.classList.add("error");
                    confirmPassword.classList.add("error");
               }
          }
          else{
               password.classList.add("error");
          }

          FinalValidation();
     }

     // Final validation (end of validation chain)
     function FinalValidation(){
          if(fn_value != false && ln_value != false && e_value != false && p_value != false){
               var data = {
                    first_name: fn_value,
                    last_name: ln_value,
                    email: e_value,
                    password: p_value 
               };
          
               fetch("http://localhost:8000/register", {
                    method: "POST", 
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
               })
               .then(res => res.json())
               .then(data=> { 
                    console.log(data); 
               }); 
          }
     }
});

