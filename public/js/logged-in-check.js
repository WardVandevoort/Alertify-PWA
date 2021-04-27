var id = sessionStorage.getItem("id");

if(id == null || id == "" || id == "undefined"){
     window.location.href = "/login.html";
}
