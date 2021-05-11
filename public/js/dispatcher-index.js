var container = document.querySelector("#calls-container");

//LiveUpdate();

function LiveUpdate() {
     setInterval(async function(){
          var response = await (await fetch("http://localhost:8000/show_active_calls")).json();
          var calls = response.message;
          
          calls.forEach(call => {
               var callTimestamp = call['created_at'];
               var callTime = new Date(callTimestamp).toTimeString();

               var today = new Date();
               var currentTime = new Date(today).toTimeString();

               var som = currentTime - callTime;

               //today.getDate() + '' + (today.getMonth()+1) + '' + today.getFullYear() + '' + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
     
               console.log(som);

               /*var listItem = document.createElement("LI");                 
               //var time = document.createTextNode("Water"); 
               var content = document.createTextNode()
               node.appendChild(textnode);                              
               container.appendChild(node); */
          });
     }, 2000)
}