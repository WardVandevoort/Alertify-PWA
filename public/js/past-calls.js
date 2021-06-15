var table = document.querySelector(".past-calls-table");
var tableHeader = document.querySelector(".table-header");
var previousPageLink = document.querySelector(".previous-page");
var nextPageLink = document.querySelector(".next-page");

window.addEventListener("load", function(){
     GetPastCalls();
});

function GetPastCalls(){
     var url_string = window.location.href;
     var url = new URL(url_string);
     var page = url.searchParams.get("page");

     var data = {
          page: parseInt(page),
     };
     
     fetch("/get_past_calls", {
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
     var calls = data.message;

     var url_string = window.location.href;
     var url = new URL(url_string);
     var page = url.searchParams.get("page");
     var currentPage = parseInt(page);
     var nextPage;
     var previousPage;

     if(currentPage > 1 && calls.length == 20){
          nextPage = currentPage + 1;
          previousPage = currentPage - 1;
     }
     else if(currentPage == 1){
          nextPage = currentPage + 1;
          previousPage = currentPage;
     }
     else if(calls.length < 20){
          nextPage = currentPage;
          previousPage = currentPage - 1;
     }

     previousPageLink.href = "/dispatcher/past-calls.html?page=" + previousPage;
     nextPageLink.href = "/dispatcher/past-calls.html?page=" + nextPage;
     
     calls.slice().reverse().forEach(call => {
          var timestamp = call["created_at"];
          var date = new Date(timestamp);
          var created_at = date.getDate() +
          "/" + (date.getMonth() + 1) +
          "/" + date.getFullYear() +
          " " + date.getHours() +
          ":" + date.getMinutes() +
          ":" + date.getSeconds();

          var notes = call["notes"];

          if(notes == "" || notes == null){
               notes = "No notes";
          }

          var user_id = call["user_id"];

          if(user_id != null){
               user_id = `<a href="/dispatcher/user.html?id=${call["user_id"]}">${call["user_id"]}</a>`;
          }

          var dispatcher_id = call["dispatcher_id"];

          if(dispatcher_id != null){
               dispatcher_id = `<a href="/dispatcher/dispatcher.html?id=${call["dispatcher_id"]}">${call["dispatcher_id"]}</a>`;
          }
          
          var tableRow = `<tr>
                              <td>${call["_id"]}</td>
                              <td>${user_id}</td>
                              <td>${dispatcher_id}</td>
                              <td>${created_at}</td>
                              <td>${call["lat"]}</td>
                              <td>${call["long"]}</td>
                              <td>${notes}</td>
                         </tr>`;
          
          tableHeader.insertAdjacentHTML("afterend", tableRow);
     });
}


