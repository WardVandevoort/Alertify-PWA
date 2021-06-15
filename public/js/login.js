var submit = document.querySelector("#submit");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var overlay = document.querySelector(".install-overlay");
var installBtn = document.querySelector(".install-btn");
var endBtn = document.querySelector(".end-btn");

var emailError = document.querySelector("#email_error");
var passwordError = document.querySelector("#password_error");

var e_value = false;
var p_value = false;

submit.addEventListener("click", function(){

     // Start validation chain
     Email();
});

document.addEventListener('keydown', (event) => {
     var code = event.key;
     if(code == "Enter"){
          // Start validation chain
          Email();
     }
});

// Email validation
function Email(){
     if(email.value.indexOf("@") != -1 && email.value.indexOf(".") != -1){
          e_value = email.value;
          email.classList.remove("error");
          emailError.innerHTML = ""; 
          Password();
     }
     else{
          email.classList.add("error");
          emailError.innerHTML = "Email address must be filled in and must be valid";
     }
}

// Password validation
function Password(){
     if(password.value != '' && password.value != ' ') {
          p_value = password.value;
          password.classList.remove("error");
          passwordError.innerHTML = "";
     }
     else{
          password.classList.add("error");
          passwordError.innerHTML = "Password must be filled in";
     }

     FinalValidation();
}

// Final validation
function FinalValidation(){
     if(e_value != false && p_value != false){
          var data = {
               email: e_value,
               password: p_value 
          };
     
          fetch("/login", {
               method: "POST", 
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {  
               ValidLogin(data);
          }); 
     }
}

// Check if login is valid (end of validation chain)
function ValidLogin(data){
     if(data.message.length != 0){
          password.classList.remove("error");
          passwordError.innerHTML = "";
          var unpackedData = data.message;

          // Insert current user's id into session storage
          sessionStorage.setItem("id", unpackedData._id);
          sessionStorage.setItem("dispatcher", 0);

          // Create cookie
          var today = new Date();
          today.setTime(today.getTime() + (30*24*60*60*1000));
          var expires = "expires=" + today.toUTCString();
          document.cookie =  "id=" + unpackedData._id + ";" + expires + ";path=http://localhost:8000/";

          // Redirect user to homepage
          window.location.href = "/";
     }
     else{
          password.classList.add("error");
          passwordError.innerHTML = "Email or password are invalid";
     }
}

//Register service worker (PWA)
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
	  	navigator.serviceWorker
		.register("/serviceWorker.js")
		.then(res => console.log("service worker registered"))
		.catch(err => console.log("service worker not registered", err))
	})
}

var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
     e.preventDefault();

     deferredPrompt = e;

     overlay.classList.remove("hidden");
     
     showInstallPromotion();
});

installBtn.addEventListener('click', async () => {
     
     hideInstallPromotion();
     
     deferredPrompt.prompt();
     
     const { outcome } = await deferredPrompt.userChoice;
     
     deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
     
     hideInstallPromotion();
     
     deferredPrompt = null;

     overlay.classList.add("hidden");
});

endBtn.addEventListener("click", function(){
     overlay.classList.add("hidden");
});