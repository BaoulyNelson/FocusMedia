    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('fr-FR', options);
        
        // Remplace les points éventuels après le jour de la semaine et le mois
        const cleanedDate = formattedDate.replace(/\./g, '');
        
        document.getElementById('date-time').textContent = cleanedDate;
    }

    // Mettre à jour la date au chargement
    updateDateTime();



    // Obtenir l'année actuelle
    const currentYear = new Date().getFullYear();
    
    // Afficher l'année dans l'élément avec l'ID 'current-year'
    document.getElementById("current-year").textContent = currentYear;