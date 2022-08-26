// Nav show on scroll up
var lastScrollTop = 0;
var thresholdPassedYet = false;
window.addEventListener("scroll", function(){
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 100){
        thresholdPassedYet = true;
        // downscroll code
        if(!header.classList.contains("header--hide")){
            header.classList.remove("header--show");
                header.classList.add("header--hide");
            }
    }
    else if(thresholdPassedYet) {
        // upscroll code
        if(!header.classList.contains("header--show")){
            header.classList.remove("header--hide");
            header.classList.add("header--show");
        }
    }
    lastScrollTop = st;
}, false);
