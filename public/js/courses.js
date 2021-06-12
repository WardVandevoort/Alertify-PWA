var container = document.querySelector("#how-btn");

window.addEventListener("load", function(){
     GetAnimations();
});

async function GetAnimations(){
     var response = await (await fetch("/get_animations")).json();
     var animations = response.message;

     animations.forEach( animation => {
          var item = `<a class="how-to-general" href="/course.html?path=${animation["path"]}&name=${animation["title"]}">${animation["title"]}</a>`
     
          container.insertAdjacentHTML("afterbegin", item);
     });
}