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
        let latestNewsContent = ''; // Stocke les articles sans catégorie pour la sidebar

        articles.forEach(article => {
            const title = article.title.$t;
            const link = article.link.find(l => l.rel === "alternate").href;

            // 📷 Récupérer l'image
            let imageUrl = "images/logo.jpg"; // Image par défaut
            if (article.media$thumbnail) {
                imageUrl = article.media$thumbnail.url;
            } else if (article.content && article.content.$t.match(/<img.*?src="(.*?)"/)) {
                imageUrl = article.content.$t.match(/<img.*?src="(.*?)"/)[1];
            }

            // 🏷 Récupérer les catégories (libellés)
            const categories = article.category ? article.category.map(cat => cat.term) : [];

            let addedToCategory = false; // Vérifier si l'article a été placé

            categories.forEach(category => {
                const section = document.querySelector(`[data-category="${category}"]`);
                if (section) {
                    section.querySelector(".blog-posts").innerHTML += `
                        <div class="news-item">
                            <img src="${imageUrl}" alt="Image de ${title}">
                            <a href="${link}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                    addedToCategory = true;
                }
            });

            // Si l'article n'a pas de catégorie correspondante, l'ajouter à la sidebar
            if (!addedToCategory) {
                latestNewsContent += `
                    <div class="news-item">
                        <img src="${imageUrl}" alt="Image de ${title}">
                        <a href="${link}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                    </div>
                `;
            }
        });

        // 🎯 Afficher les articles sans catégorie dans la sidebar
        document.querySelector("#latest-news").innerHTML = latestNewsContent;

    } catch (error) {
        console.error("Erreur lors du chargement du flux RSS :", error);
    }
}

// Charger les articles
fetchRSS();
