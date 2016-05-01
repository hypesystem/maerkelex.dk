---
---
var titleTag = document.head.querySelector("title");

rawSearch = function(recovery) {
    var value = searchBar.value;
    var terms = getTermsFromSearchString(value);

    console.log("searching", terms);

    var matches = [];
    searchData.forEach(function(maerke) {
        if(allTermsMatchMaerke(maerke, terms)) {
            matches.push(maerke);
        }
    });

    console.log("Got " + matches.length + " matches for search");

    if(!recovery) {
        addSearchHistoryFrame(value);
        if(ga) {
            ga('send', 'pageview', "/?search=" + value);
        }
    }
    titleTag.innerHTML = "Søg: " + value + " | Mærkelex";
    renderMatches(matches);
}

function getTermsFromSearchString(str) {
    return str.replace(/\s+/, ' ').split(' ');
}

function allTermsMatchMaerke(maerke, terms) {
    return terms.every(function(term) {
        return matchesMaerke(maerke, term);
    });
}

function matchesMaerke(maerke, term) {
    if(term.indexOf("tag:") == 0) {
        var termTag = term.substring(4);
        return maerke.tags.some(function(maerkeTag) {
            return maerkeTag.match(new RegExp("^" + termTag + "$", "i"));
        });
    }

    if(term.indexOf("alder:") == 0) {
        var termAge = parseInt(term.substring(6));
        if(isNaN(termAge)) {
            console.warn("User input in 'alder' invalid (should be number, is NaN)", term);
            return false;
        }
        if(maerke.age == "*") {
            return true;
        }
        if(maerke.age.indexOf("+") == maerke.age.length - 1) {
            return termAge >= maerke.age.slice(0, -1);
        }
        if(maerke.age.indexOf("-") == -1) {
            return termAge == maerke.age;
        }
        var maerkeRange = maerke.age.split("-");
        return termAge >= maerkeRange[0] && termAge <= maerkeRange[1];
    }

    var valueRegex = new RegExp(term, "i");
    if(maerke.name.replace(/&.+;/, '').match(valueRegex)) {
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
        var noMatches = '<div class="no-search-matches">Ingen mærker matchede din søgning på <strong>' + searchBar.value + '</strong>.' +
            '<br><br>' +
            'Mangler vi et mærke? <a href="mailto:kontakt@maerkelex.dk">Skriv os en email</a>, så retter vi det hurtigst muligt!</div>';
        content.innerHTML = noMatches;
        return;
    }

    var renderedMatches = matches.map(function(match) {
        var age = match.age;
        if(age == "*") {
          age = "Alle aldre";
        }
        else {
          age = match.age + " år";
        }
        {% assign m_url = "' + match.url + '" %}
        {% assign m_first_tag = "' + match.tags[0] + '" %}
        {% assign m_age = "' + age + '" %}
        {% assign m_image = "' + match.image + '" %}
        {% assign m_name = "' + match.name + '" %}
        {% capture maerke_result %}'{% include maerkebox.html %}';{% endcapture %}
        return {{ maerke_result | strip_newlines }}
    });

    content.innerHTML = renderedMatches.join(" ");
}

(function getSearchData(retries) {
    if(!retries) {
        retries = 3;
    }

    var req = new XMLHttpRequest();
    req.open("GET", "{{ site.baseurl }}/m.summary.json");
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

//set up searchyclick on tags
var tags = document.querySelectorAll("a.tag");
Array.prototype.forEach.call(tags, function(tag) {
    tag.addEventListener("click", function(e) {
        e.preventDefault();
        searchBar.value = "tag:" + tag.innerHTML;
        searchBar.focus();
        search();
        return true;
    });
});
