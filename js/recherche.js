document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = searchForm.querySelector("input");
    const searchResults = document.getElementById("searchResults");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const query = searchInput.value.trim().toLowerCase();
        if (query === "") return;

        // Récupération du flux RSS
        const rssFeed = "https://lefocusmedia.blogspot.com/feeds/posts/default?alt=rss";
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssFeed}`);
        const data = await response.json();

        const articles = data.items;

        // Filtrer les articles par mot-clé dans le titre ou la description
        const filteredArticles = articles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query)
        );

        // Afficher les résultats de recherche
        searchResults.innerHTML = filteredArticles.length > 0
            ? filteredArticles.map(article => `
                <div class="search-item">
                    <a href="${article.link}" target="_blank">
                        <h4>${article.title}</h4>
                    </a>
                    <p>${article.description.substring(0, 100)}...</p>
                </div>
            `).join("")
            : "<p>Aucun résultat trouvé.</p>";
    });
});
