document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Fonction pour fermer le menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
    }

    // Ouvre le menu
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Ferme le menu quand on clique sur la croix
    closeMenu.addEventListener('click', closeMobileMenu);

    // Ferme le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Un petit délai pour permettre à la page de scroller avant de fermer
            setTimeout(closeMobileMenu, 300);
        });
    });
});