var submit = document.querySelector(".submit");
var data = {
     query: "INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`, `date_of_birth`, `sex`, `telephone_number`, `street`, `street_number`, `city`, `postal_code`, `province`) VALUES ('Jane', 'Doe', 'jane@mail.com', '12345', '03/05/2000', 'female', '0123456789', 'Teststreet', '1', 'Testcity', '1', 'Antwerpen')"
};

submit.addEventListener("click", function(){
     fetch("http://localhost:8000/register", {
          method: "POST", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     }).then(res => {
          console.log(res.json());
     });
});
