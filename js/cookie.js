(function showCookieNoticeIfFirstVisit() {
    if(!userHasVisitedBefore()) {
        showWelcomeMessage();
        setUserHasVisitedBefore();
    }

    if(!userHasAcceptedCookies()) {
        showCookieNotice();
    }
    else {
        loadFathom();
    }
})();

function userHasVisitedBefore() {
    return aCookieMatches(/^maerkelexUserVisitedBefore=/);
}

function aCookieMatches(regex) {
    var cookies = document.cookie.split(";");
    if(cookies.length < 1) {
        return false;
    }
    cookies = cookies.filter(function(cookie) {
        return cookie.trim().match(regex);
    });
    var cookie = cookies[0];
    return !!cookie;
}

function userHasAcceptedCookies() {
    return aCookieMatches(/^maerkelexCookieNoticeAccepted=/);
}

function showCookieNotice() {
    var cookieNotice = elementFromHtml('<div class="cookieNotice">Hvis du giver os lov, bruger vi en cookie til at holde styr på hvor mange unikke besøgende vi får. Vi går meget op i brugeres privatliv, og sender ingen data videre til trejdeparter. <a href="/privatliv/">Læs mere.</a> <button>Acceptér</button></div>');

    document.body.appendChild(cookieNotice);
    cookieNotice.querySelector("button").addEventListener("click", function(event) {
        loadFathom();
        setUserHasAcceptedCookies();
        cookieNotice.className += " hidden";
        setTimeout(function() {
            cookieNotice.parentElement.removeChild(cookieNotice);
        }, 3000);
    });
}

function elementFromHtml(html) {
    var utilityDiv = document.createElement("div");
    utilityDiv.innerHTML = html;
    return utilityDiv.firstChild;
}

function loadFathom() {
    (function(f, a, t, h, o, m){
        a[h]=a[h]||function(){
            (a[h].q=a[h].q||[]).push(arguments)
        };
        o=f.createElement('script'),
        m=f.getElementsByTagName('script')[0];
        o.async=1; o.src=t; o.id='fathom-script';
        m.parentNode.insertBefore(o,m)
    })(document, window, '//analytics.xn--mrkelex-mxa.dk/tracker.js', 'fathom');
    fathom('set', 'siteId', 'UHLDU');
    fathom('trackPageview');

    document.addEventListener('turbo:load', function(e) {
        fathom('trackPageview');
    });
}

function showWelcomeMessage() {
    var welcomeMessage = elementFromHtml('<div class="first-visit-welcome"><div class="first-visit-welcome-image"></div><div class="first-visit-welcome-text"><h2>Velkommen til Mærkelex!</h2><p>Vi prøver at samle alle forløbs- og dueligheds&#173;mærker fra danske spejder&#173;korps, inklusiv de hjemme&#173;lavede, som folk selv laver og sælger.</p><p>Hvis du finder ud af at vi mangler et mærke, eller der står noget på siden der er forkert, kan du <a href="mailto:kontakt@mærkelex.dk">sende os en email</a>.</p><div class="first-visit-welcome-remover">Fjern besked</div></div></div>');

    var container = document.querySelector(".intro-message");
    if(!container) {
        return;
    }
    container.insertBefore(welcomeMessage, container.firstChild);

    document.querySelector(".first-visit-welcome-remover").addEventListener("click", function(event) {
        welcomeMessage.className += " hidden";
    });

    onSearchListeners.push(function() {
        welcomeMessage.className += " hidden";
    });
}

function setUserHasVisitedBefore() {
    document.cookie = "maerkelexUserVisitedBefore=1;expires=" + new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)).toUTCString() + ";path=/";
}

function setUserHasAcceptedCookies() {
    document.cookie = "maerkelexCookieNoticeAccepted=1;expires=" + new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)).toUTCString() + ";path=/";
}

function removeUserCookieAcceptCookie() {
    document.cookie = 'maerkelexCookieNoticeAccepted=1;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

function hideSponsor() {
  var sponsoredBadgesSection = document.querySelector(".sponsored-badges");
  if(!sponsoredBadgesSection) {
      return;
  }

  sponsoredBadgesSection.className += " hide";
  setTimeout(function () {
    sponsoredBadgesSection.style.opacity = "0";
  }, 750);
}

var hideSponsorsLink = document.querySelector(".sponsor-hide");
if(hideSponsorsLink) {
    hideSponsorsLink.addEventListener("click", function(event) {
        hideSponsor();
    })
}
