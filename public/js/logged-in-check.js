var id = sessionStorage.getItem("id");
var fullCookie = document.cookie;
var cutOff = fullCookie.indexOf("=") + 1;
var cookieId = fullCookie.substring(cutOff);

if(id == null || id == "" || id == "undefined"){
     if(cookieId == ""){
          window.location.href = "/login.html";
     }
     else{
          sessionStorage.setItem("id", cookieId);
          sessionStorage.setItem("dispatcher", 0);
     }
}
