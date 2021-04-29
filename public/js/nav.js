document.write(`

<nav class="bottom-nav">
     <a href="index.html" class="nav-link home-link"><img src="media/img/home_icon.svg" alt="home icon"></a>
     <a href="profile.html" class="nav-link profile-link"><img src="media/img/profile_icon.svg" alt="profile icon"></a>
     <a href="#" class="nav-link course-link"><img src="media/img/course_icon.svg" alt="course icon"></a>
     <a href="#" class="nav-link settings-link"><img src="media/img/settings_icon.svg" alt="settings icon"></a>
</nav>

`);

if(window.location.href.indexOf("change") >1){
     document.write(`

<nav class="bottom-nav">
     <a href="./../../index.html" class="nav-link home-link"><img src="./../../media/img/home_icon.svg" alt="home icon"></a>
     <a href="./../../profile.html" class="nav-link profile-link"><img src="./../../media/img/profile_icon.svg" alt="profile icon"></a>
     <a href="#" class="nav-link course-link"><img src="./../../media/img/course_icon.svg" alt="course icon"></a>
     <a href="#" class="nav-link settings-link"><img src="./../../media/img/settings_icon.svg" alt="settings icon"></a>
</nav>

`);
}
else if(window.location.href.indexOf("add") >1){
     
          document.write(`
     
     <nav class="bottom-nav">
          <a href="./../../index.html" class="nav-link home-link"><img src="./../../media/img/home_icon.svg" alt="home icon"></a>
          <a href="./../../profile.html" class="nav-link profile-link"><img src="./../../media/img/profile_icon.svg" alt="profile icon"></a>
          <a href="#" class="nav-link course-link"><img src="./../../media/img/course_icon.svg" alt="course icon"></a>
          <a href="#" class="nav-link settings-link"><img src="./../../media/img/settings_icon.svg" alt="settings icon"></a>
     </nav>
     
     `);
     }

else if(window.location.href.indexOf("/profile") >1){
     document.write(`

     <nav class="bottom-nav">
          <a href="./../index.html" class="nav-link home-link"><img src="./../media/img/home_icon.svg" alt="home icon"></a>
          <a href="./../profile.html" class="nav-link profile-link"><img src="./../media/img/profile_icon.svg" alt="profile icon"></a>
          <a href="#" class="nav-link course-link"><img src="./../media/img/course_icon.svg" alt="course icon"></a>
          <a href="#" class="nav-link settings-link"><img src="./../media/img/settings_icon.svg" alt="settings icon"></a>
     </nav>
     
     `);
}

