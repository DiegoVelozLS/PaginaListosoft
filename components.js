// Función auxiliar para cargar un componente solo si no está pre-renderizado
function fetchComponent(path, containerId) {
    return new Promise((resolve) => {
        const container = document.getElementById(containerId);
        if (!container) {
            resolve();
            return;
        }

        // Si ya fue pre-renderizado en el HTML estático, no hacer fetch innecesario
        if (container.children.length > 0) {
            resolve();
            return;
        }

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error(`Error al cargar ${path}: ${response.statusText}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                resolve();
            })
            .catch(error => {
                console.error('Error al cargar componente:', error);
                resolve();
            });
    });
}

function setHref(selector, href) {
    document.querySelectorAll(selector).forEach((el) => {
        el.setAttribute('href', href);
    });
}

function getSiteBasePath() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    if (pathname.includes('/versiones/') || pathname.endsWith('/versiones')) {
        return '../';
    }
    return '';
}

// Mantener alineado con la primera entrada de versiones/versiones.js
const LATEST_VERSION_SLUG = '2.1.61';
const LATEST_VERSION_PATH = 'versiones/' + LATEST_VERSION_SLUG;

// Configura enlaces limpios (sin .html) para evitar redirecciones 301 internas
function setupDynamicLinks() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const isInsideVersiones = pathname.includes('/versiones/') || pathname.endsWith('/versiones');
    const basePath = getSiteBasePath();
    const homeHref = isInsideVersiones ? '../' : './';
    const latestVersionHref = isInsideVersiones ? LATEST_VERSION_SLUG : `${basePath}${LATEST_VERSION_PATH}`;

    const navLogoLink = document.querySelector('.nav-logo-link');
    const navLogoDark = document.querySelector('.nav-logo-dark');
    const navLogoWhite = document.querySelector('.nav-logo-white');

    if (navLogoLink) navLogoLink.setAttribute('href', homeHref);
    if (navLogoDark) navLogoDark.setAttribute('src', `${basePath}assets/Logo-Listosoft.png`);
    if (navLogoWhite) navLogoWhite.setAttribute('src', `${basePath}assets/Logo-ListosoftBlanco.png`);

    setHref('.nav-erp-link', homeHref);
    setHref('.nav-modulos-link', `${basePath}modulos`);
    setHref('.nav-modulos-ver-todos', `${basePath}modulos`);
    setHref('.nav-recursos-link', `${basePath}recursos`);
    setHref('.nav-descargas-link', latestVersionHref);
    setHref('.nav-soporte-link', `${basePath}soporte`);
    setHref('.nav-empresa-link', `${basePath}Sobre-nosotros`);
    setHref('.nav-contacto-link', `${homeHref}#contacto`);

    const footerLogoLink = document.querySelector('.footer-logo-link');
    const footerLogoImg = document.querySelector('.footer-logo-img');

    if (footerLogoLink) footerLogoLink.setAttribute('href', homeHref);
    if (footerLogoImg) footerLogoImg.setAttribute('src', `${basePath}assets/Logo-Listosoft.png`);

    setHref('.footer-erp-link', homeHref);
    setHref('.footer-modulos-link', `${basePath}modulos`);
    setHref('.footer-descargas-link', latestVersionHref);
    setHref('.footer-recursos-link', `${basePath}recursos`);
    setHref('.footer-soporte-link', `${basePath}soporte`);
    setHref('.footer-sobre-nosotros-link', `${basePath}Sobre-nosotros`);
    setHref('.footer-clientes-link', `${homeHref}#clientes`);
    setHref('.footer-politica-link', `${basePath}Politica-privacidad`);
    setHref('.footer-fsoft-link', `${basePath}fsoft`);
}

function initComponents() {
    const basePath = getSiteBasePath();
    const navbarContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');
    const alreadyPrerendered =
        (!navbarContainer || navbarContainer.children.length > 0) &&
        (!footerContainer || footerContainer.children.length > 0);

    if (alreadyPrerendered) {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        document.dispatchEvent(new Event('componentsLoaded'));
        return;
    }

    const navbarPath = `${basePath}components/navbar.html?v=20261121`;
    const footerPath = `${basePath}components/footer.html?v=20261121`;

    Promise.all([
        fetchComponent(navbarPath, 'navbar-container'),
        fetchComponent(footerPath, 'footer-container')
    ]).then(() => {
        setupDynamicLinks();
        document.dispatchEvent(new Event('componentsLoaded'));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
} else {
    initComponents();
}
