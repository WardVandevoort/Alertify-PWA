var btn = document.querySelector(".call-btn");
var confirmation = document.querySelector(".confirmation");
var yes = document.querySelector(".yes");
var no = document.querySelector(".no");

btn.addEventListener("click", function() {
     confirmation.classList.remove("hidden");
});

no.addEventListener("click", function() {
     confirmation.classList.add("hidden");
});

yes.addEventListener("click", function() {
     
});
