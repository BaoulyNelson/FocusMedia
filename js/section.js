document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section"); // Toutes les sections
    const links = document.querySelectorAll("a.nav-link"); // Tous les liens du menu
  
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Empêche le comportement par défaut
  
        const targetId = this.getAttribute("href"); // Récupère l’ID de la section
        const targetSection = document.querySelector(targetId);
  
        if (targetSection) {
          // Masquer toutes les sections
          sections.forEach(section => section.style.display = "none");
  
          // Afficher la section sélectionnée
          targetSection.style.display = "block";
  
          // Modifier l’URL sans recharger la page
          history.pushState(null, "", targetId);
  
          // Défilement fluide vers la nouvelle section
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Ajuste selon la hauteur de la navbar
            behavior: "smooth"
          });
        }
      });
    });
  
    // Gérer le retour avec les boutons "Précédent" et "Suivant"
    window.addEventListener("popstate", function () {
      const hash = window.location.hash || "#accueil";
      sections.forEach(section => section.style.display = "none");
      const activeSection = document.querySelector(hash);
      if (activeSection) {
        activeSection.style.display = "block";
        window.scrollTo({
          top: activeSection.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
  