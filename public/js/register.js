var submit = document.querySelector(".submit");

submit.addEventListener("click", function(){
     fetch("http://localhost:8000/register", {
          method: "POST", 
          body: JSON.stringify("test")
     }).then(res => {
          console.log("Request complete! response:", res);
     });
});
