# Auditoría SEO Completa — Listosoft (`listosoft.com/Inicio/`)

**Fecha:** 21 de noviembre de 2026  
**Sitio auditado:** `https://listosoft.com/Inicio/` (producción en vivo + código fuente local)  
**Tipo de negocio detectado:** B2B SaaS / Software ERP & Contable Local (Ecuador — Guayaquil)  
**Puntuación Global de Salud SEO:** **56 / 100**

---

## 1. Resumen Ejecutivo

| Categoría | Peso | Puntuación | Aporte | Estado |
|---|---:|---:|---:|---|
| Technical SEO | 22% | 48 / 100 | 10.6 | Crítico |
| Content Quality (E-E-A-T) | 23% | 62 / 100 | 14.3 | Mejorable |
| On-Page SEO | 20% | 64 / 100 | 12.8 | Mejorable |
| Schema & Structured Data | 10% | 55 / 100 | 5.5 | Mejorable |
| Performance (Core Web Vitals) | 10% | 58 / 100 | 5.8 | Mejorable |
| AI Search Readiness (GEO) | 10% | 42 / 100 | 4.2 | Bajo |
| Images | 5% | 60 / 100 | 3.0 | Mejorable |
| **Total Global** | **100%** | **56 / 100** | **56.1** | **Requiere atención** |

### Top 5 Problemas Críticos / Altos
1. **`https://listosoft.com/robots.txt` devuelve HTTP 404 (Crítico):** Aunque existe `robots.root.txt` en el repositorio, no está desplegado en la raíz del dominio. Como `https://listosoft.com/sitemap.xml` también da 404, los buscadores no pueden descubrir automáticamente `https://listosoft.com/Inicio/sitemap.xml`.
2. **La raíz `https://listosoft.com/` usa HTTP 200 + `meta refresh` + JS en lugar de HTTP 301 (Crítico):** Devuelve `<title>Redirigiendo...</title>` con código 200 y redirige en cliente hacia `/Inicio/`, diluyendo la autoridad (PageRank) que llega al dominio raíz y generando una cadena de redirección `http://` → `https://` (200) → `/Inicio/`.
3. **Imagen de Open Graph, Twitter Card y `Organization.logo` rota — HTTP 404 (Crítico):** `https://listosoft.com/Inicio/assets/IsotipoListosoft.png` no existe ni en el repositorio ni en producción (404). Rompe todas las previsualizaciones al compartir en WhatsApp/LinkedIn/X y el logo en el JSON-LD de `Organization`.
4. **Navbar y Footer inyectados 100% por JS con `fetch(..., { cache: 'no-store' })` (Alto):** En el HTML crudo `<div id="navbar-container"></div>` y `<div id="footer-container"></div>` llegan vacíos. Los crawlers que no ejecutan JS (incluidos bots de IA) no ven ningún enlace de navegación y el navegador sufre desplazamiento de diseño (CLS) en cada carga.
5. **Todos los enlaces internos apuntan a `.html` causando redirecciones 301 internas (Alto):** `.htaccess` redirige `*.html` → URL limpia (301), pero `index.html`, `components.js`, `modulos.html`, `Sobre-nosotros.html`, `recursos.html` y `fsoft.html` siguen enlazando a `modulos.html`, `index.html`, `fsoft.html`, etc.

### Top 5 Quick Wins (Alto impacto, bajo esfuerzo)
1. **Copiar `robots.root.txt` a `/var/www/html/robots.txt`** en el servidor para que `https://listosoft.com/robots.txt` responda `200` y declare el `Sitemap`.
2. **Crear/subir una imagen OG real (`1200x630` PNG/JPG)** o corregir `og:image`, `twitter:image` y `Organization.logo` a un archivo existente (`200 OK`).
3. **Cambiar la redirección de `https://listosoft.com/` a un `301` real en `.htaccess`/Apache** hacia `https://listosoft.com/Inicio/`.
4. **Eliminar `.html` de todos los enlaces internos** en los HTML y en `components.js` para suprimir las redirecciones 301 internas.
5. **Añadir `defer` a los `<script>`**, `loading="lazy"` + `width`/`height` a los logos de clientes y activar `ErrorDocument 404 /Inicio/404.html` + cabeceras de seguridad en `.htaccess`.

---

## 2. Technical SEO (48 / 100)

### Lo que funciona bien
- HTTPS activo con redirección `301` desde `http://listosoft.com/` hacia `https://listosoft.com/`.
- URLs limpias funcionando (`200 OK`) en `/Inicio/`, `/Inicio/modulos`, `/Inicio/soporte`, `/Inicio/recursos`, `/Inicio/Sobre-nosotros`, `/Inicio/fsoft`, `/Inicio/Politica-privacidad` y `/Inicio/versiones/2.1.61`.
- Compresión Gzip (`mod_deflate`) y reglas de caché (`mod_expires`) configuradas en `.htaccess`.
- `sitemap.xml` en `/Inicio/sitemap.xml` responde `200 OK` (`application/xml`), es válido y excluye páginas `noindex` (`Politica-privacidad` y `versiones/*`).

### Hallazgos y Evidencia
| Severidad | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|
| **Crítico** | `robots.txt` ausente en raíz | `GET https://listosoft.com/robots.txt` → **404** (`robots.root.txt` no desplegado en `/var/www/html/robots.txt`) | Desplegar `robots.txt` en la raíz del dominio con `Sitemap: https://listosoft.com/Inicio/sitemap.xml`. |
| **Crítico** | Redirección blanda en dominio raíz | `GET https://listosoft.com/` → **200** con `<meta http-equiv="refresh" content="0; url=/Inicio/">` y `window.location.replace` | Reemplazar por un `Redirect 301 / https://listosoft.com/Inicio/` en el `.htaccess` raíz de `/var/www/html/`. |
| **Alto** | Enlaces internos generan 301 en cada clic/rastreo | `index.html`, `components.js`, `Sobre-nosotros.html`, `modulos.html`, `recursos.html`, `fsoft.html` enlazan a `*.html`, que devuelven `301` a URL limpia | Actualizar todos los `href` internos a rutas sin `.html` (`/Inicio/`, `/Inicio/modulos`, etc.). |
| **Alto** | Navegación y footer invisibles sin JS | `components.js` hace `fetch('components/navbar.html', { cache: 'no-store' })` sobre `<div id="navbar-container"></div>` vacío | Pre-renderizar navbar y footer en HTML estático (o en un paso de build simple) y quitar `cache: 'no-store'`. |
| **Alto** | Sin cabeceras de seguridad HTTP | `HEAD https://listosoft.com/Inicio/` solo devuelve `Server: Apache/2.4.58 (Ubuntu)`, `ETag`, `Vary` — faltan HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` | Añadir cabeceras de seguridad en `.htaccess` y ocultar versión de Apache (`ServerTokens Prod`). |
| **Alto** | Página 404 personalizada desactivada | `# ErrorDocument 404 /404.html` está comentado en `.htaccess`; `/Inicio/no-existe-test-404` devuelve respuesta vacía/genérica | Descomentar y corregir a `ErrorDocument 404 /Inicio/404.html`. |
| **Medio** | CORS wildcard innecesario en HTML | `.htaccess` envía `Access-Control-Allow-Origin "*"` en todos los `.html` | Eliminar o restringir al origen propio (`https://listosoft.com`). |
| **Medio** | Señal mixta `noindex` + `canonical` en `/versiones/*` | `versiones/2.1.59.html`, `2.1.60.html`, `2.1.61.html` tienen `noindex, nofollow` y `canonical` autorreferenciado | Decidir si se desean indexar (las notas de versión son muy buenas para búsquedas de soporte/long-tail) o mantener `noindex, follow` sin contradicción. |
| **Bajo** | Inconsistencia de mayúsculas en URLs | `/Inicio/`, `/Sobre-nosotros`, `/Politica-privacidad` mezclan mayúsculas con `/modulos`, `/soporte` | Estandarizar nuevas rutas en minúsculas; si se migran las existentes, añadir 301 permanentes. |

---

## 3. Content Quality & E-E-A-T (62 / 100)

### Lo que funciona bien
- Propuesta de valor clara y localizada para Ecuador (SRI, IESS, IVA, comprobantes electrónicos, 25 años de trayectoria desde 2001).
- `fsoft.html` (1.074 palabras) aporta historia auténtica y autoridad de marca (Julio Veloz, 25 años, +1.400 versiones).
- `Politica-privacidad.html` (1.515 palabras) y correo de protección de datos (`protecciondedatos@listosoft.com`) refuerzan confianza (Trust).

### Hallazgos y Evidencia
- **Contenido delgado (Thin Content) en páginas clave:** `soporte.html` (233 palabras), `recursos.html` (338 palabras), `Sobre-nosotros.html` (371 palabras) e `index.html` (389 palabras) tienen poca profundidad informativa para posicionar en consultas competidas como *"software contable Ecuador"* o *"ERP Ecuador SRI"*.
- **Sin sección de Preguntas Frecuentes (FAQ):** No hay respuestas estructuradas a dudas clave de compra (precio/licenciamiento, nube vs servidor local, migración desde otro sistema, tiempos de implementación, cumplimiento SRI/ATS/IESS).
- **Sección de proceso comentada en `index.html`:** El bloque `#proceso` (líneas 307–350 de `index.html`, con tiempos de implementación de 1–3 semanas y SLA de <4h) está comentado y oculto para usuarios y buscadores.
- **Prueba social incompleta:** Hay 16–18 logos de clientes, pero faltan testimonios reales con nombre/cargo/empresa o casos de estudio cuantificados.
- **Señales de entidad local (E-E-A-T):** `Sobre-nosotros.html` menciona Guayaquil, pero no incluye dirección física, RUC/razón social visible, horario de atención ni perfiles del equipo directivo/técnico.

---

## 4. On-Page SEO (64 / 100)

### Diagnóstico por Página
| Archivo | Title (chars) | Meta Description (chars) | H1 | OG/Twitter | Palabras | Problemas clave |
|---|---:|---:|---|---|---:|---|
| `index.html` | 54 (OK) | 143 (OK) | 1 (sin keywords ERP/contable/Ecuador) | Sí (`og:image` 404) | 389 | H1 puramente de marca; `og:image` roto |
| `modulos.html` | **19 (Corto)** | **203 (Largo, se trunca)** | 1 (OK) | Sí (`og:image` 404) | 527 | Title corto, description excede 160 chars |
| `soporte.html` | **29 (Corto)** | 127 (OK) | 1 (OK) | Sí (`og:image` 404) | **233** | Title corto, salta `h1 → h3`, thin content |
| `recursos.html` | **20 (Corto)** | **104 (Corto)** | 1 (OK) | Sí (`og:image` 404) | **338** | Title/desc cortos, salta `h1 → h3` |
| `Sobre-nosotros.html` | **26 (Corto)** | **60 (Muy corto)** | 1 (OK) | **Ausentes** | 371 | Sin OG/Twitter, description muy corta |
| `fsoft.html` | **14 (Muy corto)** | 129 (OK) | 1 (OK) | Sí (`og:image` 404) | 1.074 | Title demasiado corto sin marca/contexto |
| `404.html` | 21 | 34 | **0 (`h2` solamente)** | No | 23 | Falta `<h1>` y `<meta name="robots" content="noindex">` |

### Recomendaciones On-Page
- Optimizar todos los `<title>` a 50–60 caracteres incluyendo keywords principales y marca (ej.: `Módulos de LSoft ERP: Contabilidad, SRI y Nómina | Listosoft`).
- Ajustar `modulos.html` description a 145–155 caracteres y ampliar `Sobre-nosotros.html` a ~150 caracteres.
- Incorporar una keyword principal de forma natural en el `<h1>` de `index.html` (o combinar subtítulo semántico) sin perder el tono de marca.
- Corregir los saltos `h1 → h3` en `recursos.html`, `soporte.html` y `versiones/*.html` para mantener jerarquía `h1 → h2 → h3`.
- Añadir Open Graph y Twitter Cards a `Sobre-nosotros.html`.

---

## 5. Schema & Structured Data (55 / 100)

### Implementación Actual
- `index.html`: `@graph` válido con `SoftwareApplication` y `Organization`.
- `modulos.html`, `soporte.html`, `recursos.html`, `Sobre-nosotros.html`: `BreadcrumbList` válido.
- `fsoft.html`, `versiones/*.html`: sin JSON-LD.

### Errores y Oportunidades
1. **Error crítico en `Organization.logo`:** Apunta a `https://listosoft.com/Inicio/assets/IsotipoListosoft.png` (**404**). Debe apuntar a una imagen válida (`200 OK`, mínimo `112x112px`).
2. **Inconsistencia de URL en `Organization.url`:** Usa `https://listosoft.com/Inicio` (sin barra final) frente al canonical `https://listosoft.com/Inicio/`.
3. **Propiedades clave ausentes en `Organization`:** Añadir `sameAs` (YouTube, Instagram, LinkedIn, TikTok), `foundingDate: "2001"`, `email: "soporte@listosoft.com"`.
4. **Propiedades clave ausentes en `SoftwareApplication`:** Añadir `softwareVersion: "2.1.61"`, `featureList` (Contabilidad, Facturación Electrónica SRI, Nómina IESS, Inventario, Producción), `screenshot` y detalles de oferta.
5. **Tipos faltantes recomendados:** `WebSite` en `index.html`, `AboutPage` en `Sobre-nosotros.html`, `ContactPage` en `soporte.html`, `Article` en `fsoft.html` y `FAQPage` al agregar preguntas frecuentes.

---

## 6. Performance & Core Web Vitals (58 / 100)

*Nota: Análisis basado en inspección del código fuente y cabeceras HTTP de producción (sin credenciales de CrUX/GSC configuradas).*

### Cuellos de botella identificados
- **Scripts bloqueantes de renderizado (afecta LCP/FCP/INP):** `index.html` carga 6 scripts externos sin `defer` ni `async`: `components.js`, `script.js`, `hero.js`, `tsparticles.bundle.min.js`, `@emailjs/browser@4` y `lucide@0.460.0`.
- **Doble librería de íconos:** Se carga **Font Awesome 6.5.1** (CSS externo bloqueante) **y** **Lucide 0.460.0** (JS externo bloqueante) simultáneamente. Unificar en una sola (preferiblemente SVGs inline o solo Lucide diferido) ahorra peticiones y tiempo de bloqueo.
- **CLS por componentes inyectados:** `#navbar-container` empieza con altura `0` hasta que `components.js` completa el `fetch(..., { cache: 'no-store' })`, empujando el contenido hacia abajo en cada visita.
- **CLS por imágenes sin dimensiones:** Ninguna de las 16 imágenes de `index.html` ni las 18 de `Sobre-nosotros.html` tiene atributos `width` y `height`.
- **CSS monolítico sin minificar:** `styles.css` pesa **94.3 KB** sin minificar y se carga bloqueante en todas las páginas; `Sobre-nosotros.html` añade además un bloque `<style>` inline al final del `<body>`.

---

## 7. Images (60 / 100)

- **Atributos `alt`:** Bien implementados en los logos de clientes de `index.html` y `Sobre-nosotros.html` (0 imágenes sin `alt`).
- **Imagen crítica faltante (404):** `assets/IsotipoListosoft.png` referenciada en meta tags y JSON-LD no existe.
- **Logo blanco sobredimensionado:** `assets/Logo-ListosoftBlanco.png` pesa **171.4 KB** (10.6× más pesado que `Logo-Listosoft.png` de 16.1 KB). Comprimir o convertir a SVG/WebP ahorraría ~155 KB en cada carga.
- **Sin formatos modernos ni lazy loading:** Todos los logos de clientes están en PNG/JPG sin conversión a WebP/AVIF, sin `loading="lazy"` (a pesar de estar *below the fold*) y sin `width`/`height`.

---

## 8. AI Search Readiness / GEO (42 / 100)

- **Ausencia de `llms.txt`:** Tanto `https://listosoft.com/llms.txt` como `/Inicio/llms.txt` devuelven **404**.
- **Sin política explícita para bots de IA:** `robots.txt` raíz es 404; no hay reglas claras permitiendo `OAI-SearchBot`, `GPTBot`, `ClaudeBot` o `PerplexityBot` sobre el contenido público.
- **Navegación oculta para bots sin JS:** Como el menú y footer se cargan con `fetch()`, los rastreadores de motores de respuesta que solo leen HTML estático no descubren la arquitectura completa desde `index.html`.
- **Baja citabilidad directa:** Faltan bloques concisos de definición y preguntas-respuestas ("¿Qué es LSoft ERP?", "¿Qué incluye el módulo tributario para el SRI en Ecuador?", "¿Cuánto tarda la implementación?") que los modelos de IA puedan extraer y citar directamente.
