var html = '<div class="first-visit-welcome"><div class="first-visit-welcome-image"></div><div class="first-visit-welcome-text"><p>Velkommen til Mærkelex!</p><p>Vi prøver at samle alle forløbs- og duelighedsmærker fra danske spejderkorps, inklusiv de hjemmelavede, som folk selv laver og sælger.</p><p>Hvis du finder ud af at vi mangler et mærke, eller der står noget på siden der er forkert, kan du <a href="mailto:kontakt@mærkelex.dk">sende os en email</a>.</p></div></div>';

var container = document.querySelector(".container");
container.innerHTML = html + container.innerHTML;
