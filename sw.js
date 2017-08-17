---
---
self.addEventListener("install", function(e) {
    debugger;
    e.waitUntil(
        caches
            .open("maerkelex-cache-v1.0.0")
            .then(function(cache) {
                return cache.addAll([
                    "{{ site.baseUrl }}/",
                    "{{ site.baseUrl }}/css/style.css",
                    "{{ site.baseUrl }}/js/raw-search.js",
                    "{{ site.baseUrl }}/js/cookie.js",
                    {% for m in site.m %}
                    "{{ site.baseUrl }}{{ m.url }}",
                    "{{ site.baseUrl }}/img/compressed/{{ m.image }}",
                    {% endfor %}
                    "{{ site.baseUrl }}/m.summary.json"
                ]);
            })
    );
});
