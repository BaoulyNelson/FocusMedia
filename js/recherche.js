document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const sections = document.querySelectorAll(".section"); // Toutes les sections avec class="section"

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const query = searchInput.value.trim().toLowerCase();
        if (query === "") return;

        // Vérifie si l'utilisateur entre un ID de section (ex: #culture)
        if (query.startsWith("#")) {
            const targetSection = document.querySelector(query);

            if (targetSection) {
                sections.forEach(section => section.style.display = "none"); // Masquer toutes les sections
                targetSection.style.display = "block"; // Afficher la bonne section

                history.pushState(null, "", query); // Modifier l’URL sans recharger la page
                window.scrollTo({ top: targetSection.offsetTop - 80, behavior: "smooth" });
            }
        } else {
            // RECHERCHE PAR MOT-CLÉ DANS LES SECTIONS
            let found = false;

            sections.forEach(section => {
                const text = section.innerText.toLowerCase();
                if (text.includes(query)) {
                    section.style.display = "block"; // Afficher la section contenant le mot-clé
                    found = true;
                } else {
                    section.style.display = "none"; // Masquer les autres sections
                }
            });

            // Affiche un message si aucun résultat trouvé
            searchResults.innerHTML = found ? "" : `<p class="text-danger">Aucun résultat trouvé pour "${query}".</p>`;
        }
    });
});
