var bloodtype = document.querySelector("#blood-type");
var allergies = document.querySelector("#allergies");
var medicalConditions = document.querySelector("#med-cond");
var medication = document.querySelector("#meds");
var saveBtn = document.querySelector("#save-btn");

window.addEventListener("load", function(){
     GetUserData();
});

saveBtn.addEventListener("click", function(){
     UpdateMedicalData();
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
     bloodtype.value = data.message[0].medical_info.blood_type;
     allergies.value = data.message[0].medical_info.allergies;
     medicalConditions.value = data.message[0].medical_info.medical_conditions;
     medication.value = data.message[0].medical_info.medication;
}

function UpdateMedicalData(){

     var data = {
          user_id: sessionStorage.getItem("id"),
          blood_type: bloodtype.value,
          allergies: allergies.value, 
          medical_conditions: medicalConditions.value,
          medication: medication.value,
     };
     
     fetch("/update_medical_data", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     });

     window.location.href = "/profile/medical-info.html";
     
}