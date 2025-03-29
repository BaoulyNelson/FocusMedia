async function fetchRSS() {
    try {
        const rssFeed = "https://lefocusmedia.blogspot.com/feeds/posts/default?alt=json";
        const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(rssFeed);

        const response = await fetch(proxyUrl, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const rawData = await response.json();
        const data = JSON.parse(rawData.contents);

        if (!data.feed.entry || data.feed.entry.length === 0) {
            console.warn("Aucun article trouvé !");
            return;
        }

        const articles = data.feed.entry;
        let latestNewsContent = ''; // Articles sans catégorie spécifique

        articles.forEach(article => {
            const title = article.title.$t;
            const link = article.link.find(l => l.rel === "alternate").href;

            // Récupérer la date de publication et la formater
            const publishedDate = new Date(article.published.$t).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });

            // Récupérer l'image dynamique de l'article
            let imageUrl = "images/logo.jpg"; // Image par défaut
            if (article.media$thumbnail) {
                imageUrl = article.media$thumbnail.url;
            } else if (article.content && article.content.$t.match(/<img.*?src="(.*?)"/)) {
                imageUrl = article.content.$t.match(/<img.*?src="(.*?)"/)[1];
            }

            // Récupérer l'auteur
            const author = article.author ? article.author[0].name.$t : "Auteur inconnu";

            // Récupérer les catégories (libellés)
            const categories = article.category ? article.category.map(cat => cat.term) : [];

            let addedToCategory = false;

            categories.forEach(category => {
                const section = document.querySelector(`[data-category="${category}"]`);
                if (section) {
                    // Mettre à jour l'image de la section de manière dynamique
                    const sectionImage = section.querySelector('img');
                    if (sectionImage && sectionImage.getAttribute('data-dynamic') !== 'true') {
                        sectionImage.setAttribute('src', imageUrl);
                        sectionImage.setAttribute('data-dynamic', 'true');
                    }
                    
                    // Ajouter l'article à la section correspondante
                    section.querySelector(".blog-posts").innerHTML += `
                    <div class="blog-post">                
                        <img src="${imageUrl}" alt="Image de ${title}">
                        <div>
                            <a href="${link}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <p class="author">Par : ${author}</p>
                            <p class="date">Publié le : ${publishedDate}</p>
                        </div>
                    </div>
                    `;
                    addedToCategory = true;
                }
            });

            // Si l'article ne correspond à aucune catégorie de section, l'ajouter à la sidebar
            if (!addedToCategory) {
                latestNewsContent += `
                <div class="news-item">
                    <img src="${imageUrl}" alt="Image de ${title}">
                    <div>
                        <a href="${link}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                        <p class="author">Par : ${author}</p>
                        <p class="date">Publié le : ${publishedDate}</p>
                    </div>
                </div>
                `;
            }
        });

        // Afficher les articles sans catégorie dans la sidebar
        document.querySelector("#latest-news").innerHTML = latestNewsContent;

    } catch (error) {
        console.error("Erreur lors du chargement du flux RSS :", error);
    }
}

// Charger les articles
fetchRSS();
