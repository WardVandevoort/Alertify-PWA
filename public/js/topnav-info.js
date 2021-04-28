
if(window.location.href.indexOf("change") > -1){
     console.log("change");
     document.write(`
     <nav class="topnav-info">
     <a href="javascript:history.back()" class="backarrow"><img src="./../../media/img/topnav/arrow-back.svg" alt="arrow-back"></a>
     <div class="textbox-info"> <h2>Info</h2></div>
     <a href="#" class="logo-favicon-topnav"><img src="./../../media/img/topnav/logo_favicon.svg" alt="logo favicon"></a>
     </nav>
     `);
}
else if(window.location.href.indexOf("/profile") > -1){
     console.log("profile");
     document.write(`
     <nav class="topnav-info">
     <a href="javascript:history.back()" class="backarrow"><img src="./../media/img/topnav/arrow-back.svg" alt="arrow-back"></a>
     <div class="textbox-info"> <h2>Info</h2></div>
     <a href="#" class="logo-favicon-topnav"><img src="./../media/img/topnav/logo_favicon.svg" alt="logo favicon"></a>
     </nav>
     `);
}
else{
     document.write(`
     <nav class="topnav-info">
     <a href="javascript:history.back()" class="backarrow"><img src="media/img/topnav/arrow-back.svg" alt="arrow-back"></a>
     <div class="textbox-info"> <h2>Info</h2></div>
     <a href="#" class="logo-favicon-topnav"><img src="media/img/topnav/logo_favicon.svg" alt="logo favicon"></a>
     </nav>
     `);
}
     