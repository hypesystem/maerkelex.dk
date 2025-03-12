---
---
{% capture cacheName %}maerkelex-cache-v1.1.0-{{ site.time | replace: ' ', '-' | replace: ':', '-' | replace: '+', '' }}{% endcapture %}
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches
            .open("{{ cacheName }}")
            .then(function(cache) {
                return cache.addAll([
                    "{{ site.baseUrl }}",
                    "{{ site.baseUrl }}/",
                    "{{ site.baseUrl }}/manifest.json",
                    "{{ site.baseUrl }}/faq/",
                    "{{ site.baseUrl }}/hvem-er/",
                    "{{ site.baseUrl }}/img/hvem-er.jpg",
                    "{{ site.baseUrl }}/reklamer/",
                    "{{ site.baseUrl }}/blog/",
                    "{{ site.baseUrl }}/shop/",
                    "{{ site.baseUrl }}/kurv/",
                    "{{ site.baseUrl }}/nyeste-maerker/",
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

    
    self.skipWaiting();
    self.clients.claim();
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches
            .keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if(key != "{{ cacheName }}") {
                        return caches.delete(key);
                    }
                }));
            })
    );
});

self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches
            .open("{{ cacheName }}")
            .then(function(cache) {
                const networkResponsePromise = fetch(e.request);

                e.waitUntil(networkResponsePromise.then(function(networkResponse) {
                    return cache.put(e.request, networkResponse.clone());
                }));

                return cache
                    .match(e.request)
                    .then(function(response) {
                        return response || networkResponsePromise;
                    });
            })
    );
});
