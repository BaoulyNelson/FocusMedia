document.addEventListener("DOMContentLoaded", function () {
    const offcanvasMenu = document.getElementById("offcanvasMenu");
    const links = offcanvasMenu.querySelectorAll("a.nav-link");
  
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Empêche le comportement par défaut
  
        const targetId = this.getAttribute("href"); // Récupère l’ID de la section
        const target = document.querySelector(targetId);
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasMenu);
  
        if (target) {
          if (bsOffcanvas) {
            bsOffcanvas.hide(); // Ferme le Offcanvas
          }
  
          // Attendre la fin de l'animation de fermeture avant de scroller
          setTimeout(() => {
            window.scrollTo({
              top: target.offsetTop - 80, // Ajuste la position pour ne pas cacher sous la navbar
              behavior: "smooth"
            });
          }, 300); // Délai pour assurer la fermeture complète du Offcanvas
        }
      });
    });
  });
  