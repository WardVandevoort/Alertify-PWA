var dispatcherName = document.querySelector(".name");
var email = document.querySelector(".email");

window.addEventListener("load", function(){
     GetDispatcherData();
});

function GetDispatcherData(){
     var url_string = window.location.href;
     var url = new URL(url_string);
     var dispatcher_id = url.searchParams.get("id");
          
     var data = {
          dispatcher_id: dispatcher_id,
     };

     fetch("/get_dispatcher_data", {
          method: "POST", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then(data => {  
          ExtractDispatcherData(data);
     }); 
}

function ExtractDispatcherData(data){
     dispatcherName.innerHTML = data.message[0].first_name + " " + data.message[0].last_name; 
     email.innerHTML = data.message[0].email;
}