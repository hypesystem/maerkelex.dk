(function showCookieNoticeIfFirstVisit() {
    if(!userHasVisitedBefore()) {
        showCookieNotice();
        setUserHasVisitedBefore();
    }
})();

function userHasVisitedBefore() {
    var cookies = document.cookie.split(";");
    if(cookies.length < 1) {
        return false;
    }
    cookies = cookies.filter(function(cookie) {
        return cookie.trim().match(/^maerkelexCookieNoticeShown=/);
    });
    var cookie = cookies[0];
    return !!cookie;
}

function showCookieNotice() {
    var body = document.querySelector("body");
    var utilityDiv = document.createElement("div");
    utilityDiv.innerHTML = '<div class="cookieNotice">Vi bruger cookies for at forbedre bruger&#173;oplevelsen. Ved at bruge siden giver du dit samtykke til at vi samler anonym information om hvilke sider der besøges mest på siden.</div>';
    var cookieNotice = utilityDiv.firstChild;
    body.appendChild(cookieNotice);
    cookieNotice.addEventListener("click", function(event) {
        this.className += " hidden";
    });
}

function setUserHasVisitedBefore() {
    document.cookie = "maerkelexCookieNoticeShown=1";
}
