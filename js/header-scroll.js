// Nav show on scroll up
var lastScrollTop = 0;
window.addEventListener("scroll", function(){
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop){
       // downscroll code
       if(!header.classList.contains("hide")){
         header.classList.remove("show");
          header.className += "hide";
        }
   } else {
      // upscroll code
      if(!header.classList.contains("show")){
        header.classList.remove("hide");
        header.className += "show";
       }
   }
   lastScrollTop = st;
}, false);
