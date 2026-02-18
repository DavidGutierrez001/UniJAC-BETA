// ===== CONSTANTS =====
const MENU_OPEN_CLASS = 'is-open';

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    const openPanel = document.getElementById('panelNav');
    const menuLeft = document.getElementById('menuLeft')

    // Abrir menú
    openPanel?.addEventListener('click', () => {
        menuLeft?.classList.add(MENU_OPEN_CLASS);
    });

    // Cerrar al click fuera
    document.addEventListener('click', (e) => {
        if (menuLeft && !menuLeft.contains(e.target) && !openPanel?.contains(e.target)) {
            menuLeft.classList.remove(MENU_OPEN_CLASS);
        }
    });

    const btnSearch = document.getElementById('searchNeighborhood');
    const closeSearch = document.getElementById('closeSearch')

    btnSearch.addEventListener("click", () => {
        const searchOverlay = document.getElementById('searchOverlay');
        searchOverlay.classList.add('active')
    })

    closeSearch.addEventListener("click", () => {
        const searchOverlay = document.getElementById('searchOverlay');
        searchOverlay.classList.remove('active')
    })
});
