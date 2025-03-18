document.addEventListener("DOMContentLoaded", function () {
    const offcanvasMenu = document.getElementById("offcanvasMenu");
    const offcanvasLinks = offcanvasMenu.querySelectorAll(".nav-link");

    offcanvasLinks.forEach(link => {
        link.addEventListener("click", function () {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasMenu);
            bsOffcanvas.hide(); // Ferme le menu
        });
    });
});
