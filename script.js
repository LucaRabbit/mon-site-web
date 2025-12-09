// Event se déclenche quand le HTML est entièrement chargé
// Mais avant le chargement des images, les feuilles de style ou les scripts externes
document.addEventListener('DOMContentLoaded', () => {

    //Affichage avec effet de fondu et de glissement vers le haut quand l'élément entre dans le champ de la fenêtre
    const fadeElements = document.querySelectorAll('.fade-in');
                                        // ^^^^ Sélectionne tous les élements qui ont la classe '.fade-in'
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { // Détecte la visibilité d'un élément
            if (entry.isIntersecting) {   // TRUE quand l'élément entre dans la fenêtre
                entry.target.classList.add('in-view'); // Déclenche l'animation de la classe
                console.log('Affichage déclenché')
            } else {
                entry.target.classList.remove('in-view'); // Retire la classe si l'élément sort du champ de la fenêtre
                console.log('Affichage retiré')
            }
        });
    }, {
        threshold: 0.05 // Déclenchement quand 10% de l'élément entre dans la fenêtre
    });

    fadeElements.forEach(el => {
        observer.observe(el); // Observe chaque bloc
    });


    // Centrer verticalement la section ciblée
    const links = document.querySelectorAll('.menu a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {

            // Vérification des liens
            if (!href.startsWith('#')) { // Si ce n'est pas un anchor
            return; // Pas de preventDefault()
            }

            e.preventDefault(); // Empêche le saut brutal des anchors internes

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

// Fonction pour afficher en popup le contenu associé à une image lorsqu'on clique dessus
function openPopup(id) {
    const contenuPopup = document.getElementById(id).innerHTML;
    document.getElementById('popup-body').innerHTML = contenuPopup;
    document.getElementById('popup').style.display = 'flex';
}
// Fermer le popup en cliquant sur la croix ou en dehors de l'affichage
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
    closePopup();
    }
}