var homeLink = document.querySelector(".home-link");
var profileLink = document.querySelector(".profile-link");
var courseLink = document.querySelector(".course-link");
var settingsLink = document.querySelector(".settings-link");

homeLink.addEventListener("click", function(){
     homeLink.classList.add("active-link");
     profileLink.classList.remove("active-link");
     courseLink.classList.remove("active-link");
     settingsLink.classList.remove("active-link");
});

profileLink.addEventListener("click", function(){
     profileLink.classList.add("active-link");
     homeLink.classList.remove("active-link");
     courseLink.classList.remove("active-link");
     settingsLink.classList.remove("active-link");
});

courseLink.addEventListener("click", function(){
     courseLink.classList.add("active-link");
     profileLink.classList.remove("active-link");
     homeLink.classList.remove("active-link");
     settingsLink.classList.remove("active-link");
});

settingsLink.addEventListener("click", function(){
     settingsLink.classList.add("active-link");
     profileLink.classList.remove("active-link");
     courseLink.classList.remove("active-link");
     homeLink.classList.remove("active-link");
});