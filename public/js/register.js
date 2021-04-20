var submit = document.querySelector(".submit");
var firstName = document.querySelector("#first_name");
var lastName = document.querySelector("#last_name");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm_password");


submit.addEventListener("click", function(){
     var fn_value = false;
     var ln_value = false;
     var e_value = false;
     var p_value = false;

     // First name validation
     if(firstName.value != '' && firstName.value != ' '){
          fn_value = firstName.value;
          firstName.classList.remove("error");
     }
     else{
          firstName.classList.add("error");
     }

     // Last name validation
     if(lastName.value != '' && lastName.value != ' '){
          ln_value = lastName.value;
          lastName.classList.remove("error");
     }
     else{
          lastName.classList.add("error");
     }

     // Email validation
     if(email.value.indexOf("@") != -1 && email.value.indexOf(".") != -1){
          e_value = email.value;
          email.classList.remove("error");
     }
     else{
          email.classList.add("error");
     }

     // Password validation (encryption happens on server side)
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
          }).then(res => {
               console.log(res.json());
          });
     }
});
