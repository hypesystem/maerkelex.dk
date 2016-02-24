(function showCookieNoticeIfFirstVisit() {
    if(!userHasVisitedBefore()) {
        showCookieNotice();
        showWelcomeMessage();
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
    var cookieNotice = elementFromHtml('<div class="cookieNotice">Vi bruger cookies for at forbedre bruger&#173;oplevelsen. Ved at bruge siden giver du dit samtykke til at vi samler anonym information om hvilke sider der besøges mest på siden.</div>');

    document.body.appendChild(cookieNotice);
    cookieNotice.addEventListener("click", function(event) {
        this.className += " hidden";
    });
}

function elementFromHtml(html) {
    var utilityDiv = document.createElement("div");
    utilityDiv.innerHTML = html;
    return utilityDiv.firstChild;
}

function showWelcomeMessage() {
    var welcomeMessage = elementFromHtml('<div class="first-visit-welcome"><div class="first-visit-welcome-image"></div><div class="first-visit-welcome-text"><p>Velkommen til Mærkelex!</p><p>Vi prøver at samle alle forløbs- og duelighedsmærker fra danske spejderkorps, inklusiv de hjemmelavede, som folk selv laver og sælger.</p><p>Hvis du finder ud af at vi mangler et mærke, eller der står noget på siden der er forkert, kan du <a href="mailto:kontakt@mærkelex.dk">sende os en email</a>.</p></div></div>');

    var container = document.querySelector(".container");
    container.insertBefore(welcomeMessage, container.firstChild);
}

function setUserHasVisitedBefore() {
    document.cookie = "maerkelexCookieNoticeShown=1";
}
