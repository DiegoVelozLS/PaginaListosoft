/**
 * Sincroniza components/navbar.html y components/footer.html dentro de cada HTML estático.
 * Uso: node scripts/sync-components.mjs
 *
 * Permite editar navbar.html y footer.html en un solo lugar mientras mantiene
 * el HTML pre-renderizado para SEO, bots de IA y cero CLS.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const navbarRaw = fs.readFileSync(path.join(rootDir, 'components', 'navbar.html'), 'utf8').trim();
const footerRaw = fs.readFileSync(path.join(rootDir, 'components', 'footer.html'), 'utf8').trim();

const pages = [
    { file: 'index.html', inSubdir: false },
    { file: 'modulos.html', inSubdir: false },
    { file: 'recursos.html', inSubdir: false },
    { file: 'soporte.html', inSubdir: false },
    { file: 'Sobre-nosotros.html', inSubdir: false },
    { file: 'Politica-privacidad.html', inSubdir: false },
    { file: '404.html', inSubdir: false },
    { file: 'versiones/2.1.59.html', inSubdir: true },
    { file: 'versiones/2.1.60.html', inSubdir: true },
    { file: 'versiones/2.1.61.html', inSubdir: true },
];

function adaptForSubdir(html) {
    return html
        .replace(/href="\.\/#([^"]+)"/g, 'href="../#$1"')
        .replace(/href="\.\/"/g, 'href="../"')
        .replace(/href="versiones\/([^"]+)"/g, 'href="$1"')
        .replace(/href="(modulos|soporte|recursos|Sobre-nosotros|Politica-privacidad|fsoft)"/g, 'href="../$1"')
        .replace(/src="assets\//g, 'src="../assets/');
}

function replaceContainer(html, containerId, componentHtml) {
    const pattern = new RegExp(
        `(<div\\s+id="${containerId}"[^>]*>)[\\s\\S]*?(<\\/div>\\s*(?=<!--\\s*\\/@component:${containerId}\\s*-->)|<\\/div>)`,
        'i'
    );
    // Prefer explicit marker if already synced
    const markerPattern = new RegExp(
        `<div id="${containerId}">\\s*<!-- @component:${containerId} -->[\\s\\S]*?<!-- \\/@component:${containerId} -->\\s*<\\/div>`,
        'i'
    );
    const wrapped = `<div id="${containerId}">\n<!-- @component:${containerId} -->\n${componentHtml}\n<!-- /@component:${containerId} -->\n</div>`;

    if (markerPattern.test(html)) {
        return html.replace(markerPattern, wrapped);
    }
    const emptyPattern = new RegExp(`<div\\s+id="${containerId}"\\s*><\\/div>`, 'i');
    if (emptyPattern.test(html)) {
        return html.replace(emptyPattern, wrapped);
    }
    return html;
}

let updatedCount = 0;
for (const page of pages) {
    const filePath = path.join(rootDir, page.file);
    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, 'utf8');
    const navHtml = page.inSubdir ? adaptForSubdir(navbarRaw) : navbarRaw;
    const footHtml = page.inSubdir ? adaptForSubdir(footerRaw) : footerRaw;

    const next = replaceContainer(replaceContainer(html, 'navbar-container', navHtml), 'footer-container', footHtml);
    if (next !== html) {
        fs.writeFileSync(filePath, next, 'utf8');
        updatedCount++;
        console.log(`Synced: ${page.file}`);
    } else {
        console.log(`Up to date: ${page.file}`);
    }
}
console.log(`Done. Updated ${updatedCount} files.`);
