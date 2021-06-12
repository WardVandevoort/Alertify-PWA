var header = document.querySelector(".course-h1");
var animation = document.querySelector("#animation");

var url_string = window.location.href;
var url = new URL(url_string);
var path = url.searchParams.get("path");
var animationName = url.searchParams.get("name");

window.addEventListener("load", function(){
     header.innerHTML = animationName;
     animation.src = path;
});

