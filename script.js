// Event se déclenche quand le HTML est entièrement chargé
// Mais avant le chargement des images, les feuilles de style ou les scripts externes
document.addEventListener('DOMContentLoaded', () => {

    //Affichage avec effet de fondu et de glissement vers le haut quand l'élément entre dans le champ de la fenêtre
    const fadeElements = document.querySelectorAll('.fade-in');
                                        // ^^^^ Sélectionne tous les élements qui ont la classe '.fade-in'
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { // Détecte la visibilité d'un élément
            if (entry.isIntersecting) {   // TRUE quand l'élément entre dans la fenêtre
                entry.target.classList.add('visible'); // Déclenche l'animation de la classe
                console.log('Affichage déclenché')
            } else {
                entry.target.classList.remove('visible'); // Retire la classe si l'élément sort du champ de la fenêtre
                console.log('Affichage retiré')
            }
        });
    }, {
        threshold: 0.1 // Déclenchement quand 10% de l'élément entre dans la fenêtre
    });

    fadeElements.forEach(el => {
        observer.observe(el); // Observe chaque bloc
    });

    // Change la transparence du menu
    const OpacityMenu = document.querySelector('.menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            OpacityMenu.classList.add('scrolled');
            console.log('Scroll détecté')
        } else {
            OpacityMenu.classList.remove('scrolled');
        }
    });

// Affichage des détails de l'évènement du calendrier cliqué
    const eventCells = document.querySelectorAll('.event'); // Sélectionne toutes les cellules du calendrier qui ont la classe '.event'
    const detailsBox = document.getElementById('event-details'); // Cible la zone d’affichage des détails identifiée par l’ID event-details

    eventCells.forEach(cell => { // Pour chaque cellule, ajout d'un event listener
        cell.addEventListener('click', () => {
            const info = cell.getAttribute('data-info'); // Récupère le contenu de l’attribut data-info qui contient le texte à afficher
            console.log('Contenu récupéré')
            const date = cell.childNodes[0].nodeValue.trim(); // Récupère le numéro du jour en supprimant les espaces inutiles

            // Se referme si déjà visible avec le même contenu
            if (detailsBox.classList.contains('visible') && detailsBox.innerHTML.includes(date)) {
                detailsBox.classList.remove('visible'); // Masque la zone et vide le contenu
                detailsBox.classList.add('hidden');
                detailsBox.innerHTML = '';
                console.log('Zone détails évènements fermée')
            } else { // Affichage des détails de l'évenement pour ce jour
                const events = info.split('|').map(e => e.trim());
                const eventList = events.map(e => {
                    // Détecte les liens dans le texte
                    const urlMatch = e.match(/\((https?:\/\/[^\s)]+)\)/);
                    if (urlMatch) {
                        const url = urlMatch[1];
                        const label = e.replace(urlMatch[0], '').trim();
                        return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
                    } else {
                        return `<li>${e}</li>`;
                    }
                }).join('');

                detailsBox.innerHTML = `<strong>Événements du ${date} novembre :</strong><ul>${eventList}</ul>`;
                detailsBox.classList.remove('hidden');
                detailsBox.classList.add('visible');
                console.log('Zone details évènements affichée')
            }
        });
    });

    // Centrer verticalement la section ciblée
    const links = document.querySelectorAll('.menu a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le saut brutal

            const targetId = link.getAttribute('href').substring(1); // Enlève le #
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center' // Centre verticalement dans la fenêtre
                });
                console.log('Affichage centré verticalement')
            }

            // Mise à jour du lien actif
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            console.log('Maj du lien actif effectué')
        });
    });

    // Affichage du menu sous forme hamburger quand l'affichage est réduit
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-list');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('show');
        console.log('Menu hamburger affiché')
    });

    // Fermer le menu après clic sur un lien
    const MenuLinks = menu.querySelectorAll('a');
    MenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            console.log('Menu hamburger fermé')
        });
    });
});