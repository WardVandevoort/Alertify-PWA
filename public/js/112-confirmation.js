var btn = document.querySelector(".call-btn");
var confirmation = document.querySelector(".confirmation");
var yes = document.querySelector(".yes");
var no = document.querySelector(".no");
var popup = document.querySelector(".pop-up");
var choice = document.querySelector(".choice");
var chat = document.querySelector(".chat");
var call = document.querySelector(".call");

btn.addEventListener("click", function() {
     popup.classList.remove("hidden");
     choice.classList.add("hidden");
     confirmation.classList.remove("hidden");
});

window.onclick = function(event) {
     if (event.target == confirmation) {
          popup.classList.add("hidden");
          confirmation.classList.add("hidden");
          choice.classList.add("hidden");
     }
}

no.addEventListener("click", function() {
     popup.classList.add("hidden");
     confirmation.classList.add("hidden");
});

yes.addEventListener("click", function() {
     popup.classList.add("hidden");
     choice.classList.remove("hidden");
});

call.addEventListener("click", function() {
     window.location.href = "/call";
});

/*chat.addEventListener("click", function() {
     window.location.href = "112/chat.html"
});*/
