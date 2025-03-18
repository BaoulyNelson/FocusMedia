async function fetchRSS() {
    const rssFeed = "https://elconquistadorbaoulyn.blogspot.com/feeds/posts/default?alt=rss"; // Flux RSS de ton blog
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssFeed}`);
    const data = await response.json();

    // Articles à insérer
    const articles = data.items;

    // Pour chaque section, afficher un article
    // "Accueil" - la première section
    const accueilSection = document.querySelector('#accueil');
    accueilSection.querySelector('h2').innerText = articles[0].title; // Mettre le titre de l'article ici
    accueilSection.querySelector('.blog-posts').innerHTML = `
        <a href="${articles[0].link}" target="_blank">
            <p>${articles[0].description}</p>
        </a>
    `;

    // "Culture" - la deuxième section
    const cultureSection = document.querySelector('#culture');
    cultureSection.querySelector('h2').innerText = articles[1].title; // Mettre le titre de l'article ici
    cultureSection.querySelector('.blog-posts').innerHTML = `
        <a href="${articles[1].link}" target="_blank">
            <p>${articles[1].description}</p>
        </a>
    `;

    // "Economie" - la troisième section
    const economySection = document.querySelector('#economy');
    economySection.querySelector('h2').innerText = articles[2].title; // Mettre le titre de l'article ici
    economySection.querySelector('.blog-posts').innerHTML = `
        <a href="${articles[2].link}" target="_blank">
            <p>${articles[2].description}</p>
        </a>
    `;

    // "National" - la quatrième section
    const nationalSection = document.querySelector('#national');
    nationalSection.querySelector('h2').innerText = articles[3].title; // Mettre le titre de l'article ici
    nationalSection.querySelector('.blog-posts').innerHTML = `
        <a href="${articles[3].link}" target="_blank">
            <p>${articles[3].description}</p>
        </a>
    `;
}

// Appeler la fonction pour récupérer et afficher les articles
fetchRSS();
