window.addEventListener("DOMContentLoaded", () => {
    // ================================
    // LOADER INICIAL
    // ================================
    const contentLoader = document.getElementById("contentLoader");
    if (contentLoader) {
        contentLoader.style.opacity = "0";
        contentLoader.style.visibility = "hidden";
    }

    // ================================
    // HEADER + BOTÓN SCROLL TOP
    // ================================
    const header = document.getElementById("header");

    function onScroll() {
        if (!header) return;

        const scrolledHeader = window.scrollY >= 100;
        const scrolledBtn = window.scrollY >= 600;

        header.classList.toggle("on-scroll", scrolledHeader);

        const btnScroll = document.getElementById("scrollBtn");
        if (btnScroll) btnScroll.classList.toggle("is-visible", scrolledBtn);
    }

    function bindScrollTopButton() {
        const btnScroll = document.getElementById("scrollBtn");
        if (!btnScroll) return;

        btnScroll.addEventListener("click", () => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }


    window.addEventListener("scroll", onScroll);

    // ================================
    // MENÚ RESPONSIVE
    // ================================
    const btnMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menuContainer");

    const openMenu = () => menu && menu.classList.add("is-open");
    const closeMenu = () => menu && menu.classList.remove("is-open");

    if (btnMenu) btnMenu.addEventListener("click", openMenu);

    document.addEventListener("click", (e) => {
        if (!btnMenu || !menu) return;
        if (btnMenu.contains(e.target)) return;
        if (!menu.contains(e.target)) closeMenu();
    });

    // =========================
    // SPA ROUTER
    // =========================
    const main = document.querySelector("#mainContent");
    const homeHTML = main ? main.innerHTML : "";

    async function loadView(path) {
        const res = await fetch(path);
        const html = await res.text();
        if (main) main.innerHTML = html;
    }

    // =========================
    // RENDER POR HASH
    // =========================
    function render() {
        const route = location.hash || "#/";
        window.scrollTo(0, 0);

        const isHome = route === "#/" || route === "#/home" || route === "#/inicio";
        const isAuth = route === "#/login" || route === "#/register";

        if (header) header.classList.toggle("light-theme", !isHome);

        if (isHome) {
            if (main) main.innerHTML = homeHTML;
            bindScrollTopButton(); // el botón existe en Home, así que bindea aquí
            onScroll();            // recalcular clases al volver a pintar Home
            return;
        }

        if (isAuth) {
            if (route === "#/login") return loadView("pages/login.html");
            return loadView("pages/register.html");
        }

        if (main) {
            main.innerHTML = `
                <div class="not-found">
                    <div>Página no encontrada <span class="code">404</span></div>
                </div>
            `;
        }
    }

    window.addEventListener("hashchange", render);
    render();
});
