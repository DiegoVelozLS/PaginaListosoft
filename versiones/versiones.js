// Origen único del listado de versiones. Al publicar una versión nueva,
// añada su entrada al inicio de este arreglo y actualice LATEST_VERSION_PATH
// en components.js.
const LISTOSOFT_VERSIONS = [
    {
        id: '2.1.59',
        date: '2026-09-15',
        dateLabel: '15 de septiembre de 2026',
        type: 'Menor',
        title: 'Inventario, control y reportes',
        file: '2.1.59.html'
    }
];

function versionYear(version) {
    return version.date.slice(0, 4);
}

function renderVersionsAside() {
    const aside = document.getElementById('version-aside');
    if (!aside) return;

    const current = document.body.dataset.version;
    const years = [];

    LISTOSOFT_VERSIONS.forEach((version) => {
        const year = versionYear(version);
        const group = years.find((item) => item.year === year);
        if (group) {
            group.versions.push(version);
        } else {
            years.push({ year: year, versions: [version] });
        }
    });

    const groups = years.map((group) => {
        const items = group.versions.map((version) => {
            const active = version.id === current ? ' is-active' : '';
            const aria = version.id === current ? ' aria-current="page"' : '';
            return `<li><a class="version-aside-link${active}" href="${version.file}"${aria}>${version.id}</a></li>`;
        }).join('');

        return `<p class="version-aside-year">${group.year}</p><ul class="version-aside-list">${items}</ul>`;
    }).join('');

    aside.innerHTML = `
        <h2 class="version-aside-title">Versiones</h2>
        ${groups}
    `;
}

function setupTocScrollSpy() {
    const tocLinks = document.querySelectorAll('.version-toc .toc-link');
    if (!tocLinks.length) return;

    const sections = Array.from(tocLinks).map((link) => {
        const id = link.getAttribute('href').replace('#', '');
        return document.getElementById(id);
    }).filter(Boolean);

    if (!sections.length) return;

    function onScroll() {
        const scrollPos = window.scrollY + 180;

        let activeSectionId = sections[0].id;
        sections.forEach((sec) => {
            if (sec.offsetTop <= scrollPos) {
                activeSectionId = sec.id;
            }
        });

        tocLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
    renderVersionsAside();
    setupTocScrollSpy();
});
