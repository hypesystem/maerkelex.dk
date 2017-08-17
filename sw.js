---
---
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches
            .open("maerkelex-cache-v1.0.0")
            .then(function(cache) {
                return cache.addAll([
                    "{{ site.baseUrl }}/",
                    "{{ site.baseUrl }}/index.html",
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

self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches
            .match(e.request)
            .then(function(response) {
                return response || fetch(e.request);
            })
    );
});
