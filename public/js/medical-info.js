var bloodtype = document.querySelector("#bloodtype");
var allergies = document.querySelector("#allergies");
var medicalConditions = document.querySelector("#medical-conditions");
var medication = document.querySelector("#medication");

window.addEventListener("load", function(){
     GetUserData();
});

function GetUserData(){
     var data = {
          user_id: sessionStorage.getItem("id")
     };
     
     fetch("/get_user_data", {
          method: "POST", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then(data => {  
          ExtractData(data);
     }); 
}

function ExtractData(data){
     bloodtype.innerHTML = data.message[0].medical_info.blood_type;
     allergies.innerHTML = data.message[0].medical_info.allergies;
     medicalConditions.innerHTML = data.message[0].medical_info.medical_conditions;
     medication.innerHTML = data.message[0].medical_info.medication;
}