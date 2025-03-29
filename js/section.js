document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section"); // Récupère toutes les sections
    const links = document.querySelectorAll("a.nav-link");
  
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
  
        if (targetSection) {
          // Masquer toutes les sections
          sections.forEach(section => section.style.display = "none");
  
          // Afficher la section correspondante
          targetSection.style.display = "block";
  
          // Scroll jusqu'à la section affichée
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Ajuste pour la navbar
            behavior: "smooth"
          });
        }
      });
    });
  });
  