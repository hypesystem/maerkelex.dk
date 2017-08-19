---
---
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches
            .open("maerkelex-cache-v1.0.1-{{ site.time | replace: ' ', '-' | replace: ':', '-' | replace: '+', '' }}")
            .then(function(cache) {
                return cache.addAll([
                    "{{ site.baseUrl }}/",
                    "{{ site.baseUrl }}/manifest.json",
                    "{{ site.baseUrl }}/faq/",
                    "{{ site.baseUrl }}/hvem-er/",
                    "{{ site.baseUrl }}/img/hvem-er.png",
                    "{{ site.baseUrl }}/reklamer/",
                    "{{ site.baseUrl }}/blog/",
                    "{{ site.baseUrl }}/font/OpenSans-Regular.ttf",
                    "{{ site.baseUrl }}/font/OpenSans-Light.ttf",
                    "{{ site.baseUrl }}/img/logo.svg",
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
