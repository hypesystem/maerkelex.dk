---
---
rawSearch = function(recovery) {
    var value = searchBar.value;
    console.log("searching", value);

    var matches = [];
    searchData.forEach(function(maerke) {
        if(matchesMaerke(maerke, value)) {
            matches.push(maerke);
        }
    });

    console.log("Got " + matches.length + " matches for search");

    if(!recovery) {
        if(ga) {
            ga('send', 'pageview');
        }
        addSearchHistoryFrame(value);
    }
    renderMatches(matches);
}

function matchesMaerke(maerke, value) {
    var valueRegex = new RegExp(value, "i");
    if(maerke.name.match(valueRegex)) {
        return true;
    }
    for(var i = 0; i < maerke.tags.length; i++) {
        var tag = maerke.tags[i];
        if(tag.match(valueRegex)) {
            return true;
        }
    }
    return false;
}

function addSearchHistoryFrame(value) {
    history.pushState({ search: value, maerkelex: true }, "Mærkelex", "/?search=" + value);
}

function renderMatches(matches) {
    var content = document.querySelector(".container .content");

    if(matches.length < 1) {
        var noMatches = '<div class="no-search-matches">Ingen mærker matchede din søgning på <strong>' + searchBar.value + '</strong>.</div>';
        content.innerHTML = noMatches;
        return;
    }

    var renderedMatches = matches.map(function(match) {
        return [
            '<a class="maerke-box" href="{{ site.baseurl }}' + match.url + '" style="background-image: url(\'{{ site.baseurl }}/img/' + match.image + '\');">',
            '<h1>' + match.name + '</h1>',
            '</a>'
        ].join("");
    });

    content.innerHTML = renderedMatches.join(" ");
}

(function getSearchData(retries) {
    if(!retries) {
        retries = 3;
    }

    var req = new XMLHttpRequest();
    req.open("GET", "{{ site.baseurl }}/m.json");
    req.onreadystatechange = function() {
        if(req.readyState != 4) {
            return;
        }
        if(req.status > 499 && req.status < 600) {
            console.warn("Server error happened while getting searchable data (status " + req.status + "): " + req.responseText);
            if(retries > 0) {
                console.warn("Retrying getting of search data in 500 ms ...");
                return setTimeout(function() {
                    getSearchData(retries - 1);
                }, 500);
            }
        }
        if(req.status != 200) {
            return console.error("Failed to get searchable data (status " + req.status + "): " + req.responseText);
        }
        var responseObj;
        try {
            responseObj = JSON.parse(req.responseText);
        }
        catch(e) {
            return console.warn("Received unparseable data", req.responseText);
        }
        searchData = responseObj.m;
    };
    req.send();
})();
