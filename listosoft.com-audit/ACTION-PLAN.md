# Plan de Acción SEO Priorizado — Listosoft (`listosoft.com/Inicio/`)

Ordenado por impacto, dependencia técnica y criterio de verificación (cómo comprobar que quedó bien).

---

## Fase 1: Correcciones Críticas (Semana 1)

1. **Desplegar `robots.txt` en la raíz del dominio (`/var/www/html/robots.txt`)**
   - **Acción:** Copiar `robots.root.txt` a `/var/www/html/robots.txt` asegurando `Sitemap: https://listosoft.com/Inicio/sitemap.xml` y permitiendo bots de búsqueda e IA.
   - **Verificación:** `curl -I https://listosoft.com/robots.txt` devuelve `HTTP/2 200` y muestra la línea `Sitemap:`.

2. **Reemplazar el `meta refresh` de `https://listosoft.com/` por una redirección HTTP 301 real**
   - **Acción:** Configurar en el `.htaccess` de `/var/www/html/` una redirección `301` directa de `/` → `https://listosoft.com/Inicio/` (asegurando que `/robots.txt`, `/llms.txt` y otras rutas válidas no se redirijan).
   - **Verificación:** `curl -I https://listosoft.com/` devuelve `301 Moved Permanently` con `Location: https://listosoft.com/Inicio/`.

3. **Corregir la imagen OG/Twitter y `Organization.logo` (404)**
   - **Acción:** Crear `assets/og-listosoft.png` (`1200x630`, <150 KB) para redes sociales y usar `assets/Logo-Listosoft.png` (o un isotipo PNG real existente) en `Organization.logo`. Actualizar todos los HTML.
   - **Verificación:** Todas las URLs de `og:image`, `twitter:image` y `Organization.logo` responden `200 OK` y validan sin errores en Rich Results Test y OpenGraph Debugger.

4. **Activar página 404 personalizada y añadir `noindex` + `<h1>` en `404.html`**
   - **Acción:** En `.htaccess`, descomentar y corregir a `ErrorDocument 404 /Inicio/404.html`. En `404.html`, cambiar el título principal a `<h1>` y añadir `<meta name="robots" content="noindex, follow">`.
   - **Verificación:** `https://listosoft.com/Inicio/url-inexistente` devuelve `404` mostrando el diseño de Listosoft.

---

## Fase 2: Mejoras de Alto Impacto (Semanas 2–3)

5. **Eliminar extensiones `.html` de todos los enlaces internos**
   - **Acción:** Actualizar `href` en `index.html`, `modulos.html`, `recursos.html`, `soporte.html`, `Sobre-nosotros.html`, `fsoft.html`, `404.html` y `components.js` para apuntar a URLs limpias (`/Inicio/`, `/Inicio/modulos`, etc.).
   - **Verificación:** Un rastreo interno no detecta ningún enlace interno que responda `301`.

6. **Pre-renderizar Navbar y Footer en el HTML estático (eliminar `fetch` con `no-store`)**
   - **Acción:** Incluir el HTML de `<header>` y `<footer>` directamente en las páginas (manualmente o mediante un script Node/build antes de desplegar) y eliminar `cache: 'no-store'`.
   - **Verificación:** Al ver el código fuente (`Ctrl+U`) de `index.html` sin JS, aparecen todos los enlaces del menú y footer; CLS en PageSpeed Insights < `0.05`.

7. **Añadir cabeceras de seguridad HTTP en `.htaccess`**
   - **Acción:** Configurar `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y eliminar `Access-Control-Allow-Origin "*"`.
   - **Verificación:** `curl -I https://listosoft.com/Inicio/` muestra todas las cabeceras de seguridad.

8. **Optimizar carga de JS, CSS e Imágenes (Core Web Vitals)**
   - **Acción:** Añadir `defer` a los `<script>`, eliminar la duplicidad Font Awesome + Lucide, comprimir `Logo-ListosoftBlanco.png` (de 171 KB a <20 KB o SVG), convertir logos de clientes a WebP y añadir `width`, `height` y `loading="lazy"`.
   - **Verificación:** PageSpeed Insights móvil > 90 en Performance y LCP <= 2.5s.

9. **Optimizar Titles, Meta Descriptions, OG y Jerarquía de Encabezados**
   - **Acción:** Reescribir titles (50–60 chars) y descriptions (140–155 chars) en `modulos.html`, `soporte.html`, `recursos.html`, `Sobre-nosotros.html` y `fsoft.html`; añadir OG/Twitter a `Sobre-nosotros.html`; corregir saltos `h1 → h3` en `recursos.html`, `soporte.html` y `versiones/*.html`.
   - **Verificación:** Auditoría On-Page con 0 titles cortos, 0 descriptions truncadas y 0 saltos de encabezado.

---

## Fase 3: Contenido, Schema y AI Search / GEO (Mes 2)

10. **Enriquecer JSON-LD en todo el sitio**
    - **Acción:** Completar `Organization` (`sameAs`, `foundingDate`, `email`, URL con barra final) y `SoftwareApplication` (`softwareVersion`, `featureList`) en `index.html`; añadir `WebSite`, `AboutPage`, `ContactPage` y `Article` en las páginas correspondientes.
    - **Verificación:** 0 errores y 0 advertencias críticas en Google Rich Results Test y Schema Markup Validator.

11. **Expandir contenido comercial y señales E-E-A-T**
    - **Acción:** Reactivar/pulir la sección `#proceso` en `index.html`; añadir bloque de **Preguntas Frecuentes (FAQ)** con `FAQPage` schema en `index.html` y `modulos.html`; incluir 2–3 testimonios reales de clientes y dirección/datos corporativos completos en `Sobre-nosotros.html`.
    - **Verificación:** Páginas principales con >600 palabras útiles orientadas a intención de búsqueda en Ecuador (ERP, SRI, IESS, nómina, contabilidad).

12. **Publicar `/llms.txt` y mejorar citabilidad para IA (GEO)**
    - **Acción:** Crear `llms.txt` en la raíz (`https://listosoft.com/llms.txt`) resumiendo qué es Listosoft/LSoft ERP, módulos, mercado (Ecuador), enlaces canónicos y contacto.
    - **Verificación:** `GET https://listosoft.com/llms.txt` devuelve `200 OK` en formato Markdown limpio.

---

## Fase 4: Monitoreo Continuo (Recurrente)

13. **Configurar Google Search Console y seguimiento de cambios**
    - **Acción:** Verificar propiedad de dominio `listosoft.com` en GSC, enviar `https://listosoft.com/Inicio/sitemap.xml`, actualizar `<lastmod>` en cada despliegue y revisar Core Web Vitals (CrUX) mensualmente.
    - **Verificación:** 100% de las 6 URLs del sitemap indexadas sin errores de cobertura.
