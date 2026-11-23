# Re-Auditoría SEO en Producción — Listosoft (`listosoft.com/Inicio/`)

**Fecha:** 21 de noviembre de 2026 (post-despliegue)  
**Sitio auditado:** `https://listosoft.com/Inicio/` (rastreo 100% en vivo en producción)  
**Tipo de negocio:** B2B SaaS / Software ERP & Contable Local (Ecuador — Guayaquil)  
**Puntuación Global de Salud SEO:** **82 / 100** *(antes: 56 / 100 · mejora de **+26 puntos**)*

---

## 1. Comparativa Antes vs. Después

| Categoría | Peso | Antes | Ahora | Cambio | Estado |
|---|---:|---:|---:|---:|---|
| Technical SEO | 22% | 48 | **92** | +44 | Excelente |
| Content Quality (E-E-A-T) | 23% | 62 | **66** | +4 | Oportunidad (Fase 5) |
| On-Page SEO | 20% | 64 | **90** | +26 | Excelente |
| Schema & Structured Data | 10% | 55 | **88** | +33 | Muy bueno |
| Performance (CWV) | 10% | 58 | **80** | +22 | Bueno |
| AI Search Readiness (GEO) | 10% | 42 | **76** | +34 | Bueno |
| Images | 5% | 60 | **88** | +28 | Muy bueno |
| **Total Global** | **100%** | **56 / 100** | **82 / 100** | **+26** | **Saludable** |

- **Problemas Críticos restantes:** **0** (antes: 3)
- **Problemas Altos restantes:** **0** (antes: 4)
- **Problemas Medios restantes:** 4 (principalmente profundidad de contenido/E-E-A-T y optimización fina de assets)
- **Problemas Bajos restantes:** 2

---

## 2. Resultados Verificados en Vivo (Producción)

| Ruta | HTTP | Cabeceras Seg. | Title | Desc | Palabras | H1 | Navbar/Footer HTML | Scripts bloq. | Enlaces `.html` | JSON-LD |
|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---|
| `/` (raíz) | **301 → `/Inicio/`** | — | — | — | — | — | — | — | — | — |
| `/Inicio/` | 200 | 5/5 | 55 | 146 | 483 | 1 | Sí / Sí | 0 | 0 | WebSite, SoftwareApplication, Organization |
| `/Inicio/modulos` | 200 | 5/5 | 62 | 144 | 621 | 1 | Sí / Sí | 0 | 0 | BreadcrumbList |
| `/Inicio/soporte` | 200 | 5/5 | 59 | 139 | 332 | 1 | Sí / Sí | 0 | 0 | ContactPage, BreadcrumbList |
| `/Inicio/recursos` | 200 | 5/5 | 52 | 141 | 435 | 1 | Sí / Sí | 0 | 0 | BreadcrumbList |
| `/Inicio/Sobre-nosotros` | 200 | 5/5 | 58 | 153 | 465 | 1 | Sí / Sí | 0 | 0 | AboutPage, BreadcrumbList |
| `/Inicio/fsoft` | 200 | 5/5 | 50 | 132 | 1.074 | 1 | N/A / Sí | 0 | 0 | Article |
| `/Inicio/Politica-privacidad` | 200 | 5/5 | 35 | 57 | 1.609 | 1 | Sí / Sí | 0 | 0 | — (`noindex`) |
| `/Inicio/versiones/2.1.61` | 200 | 5/5 | 41 | 152 | 1.273 | 1 | Sí / Sí | 0 | 0 | — (`noindex`) |
| `/robots.txt` | **200** | — | — | — | — | — | Sitemap declarado | — | — | — |
| `/llms.txt` | **200** | — | — | — | — | — | 1.7 KB Markdown | — | — | — |
| `/Inicio/assets/og-listosoft.png` | **200** | — | — | — | — | — | 1200×630 (58.9 KB) | — | — | — |
| `/Inicio/server-root/*`, `/Inicio/scripts/*` | **403** | — | — | — | — | — | Bloqueado al público | — | — | — |

---

## 3. Oportunidades Restantes (para pasar de 82 → 92+)

### Prioridad Media (todas opcionales / de contenido o afinado)
1. **Contenido comercial y E-E-A-T (Content Quality: 66/100):**
   - `soporte` (332 palabras), `recursos` (435), `Sobre-nosotros` (465) e `Inicio` (483) se beneficiarían de reactivar `#proceso`, agregar un bloque de Preguntas Frecuentes (FAQ) con `FAQPage` schema y sumar 2–3 testimonios reales de clientes.
2. **Doble librería de íconos + WebP (Performance: 80/100):**
   - Se sigue cargando Font Awesome CSS + Lucide JS en las páginas con navbar/footer; convertir los logos de clientes a WebP y consolidar íconos ahorraría solicitudes externas.
3. **Medición con datos reales de Google (GSC + CrUX):**
   - Enviar `https://listosoft.com/Inicio/sitemap.xml` en Google Search Console y verificar Core Web Vitals reales en PageSpeed Insights.
4. **Notas de versión (`versiones/*.html`):**
   - Siguen en `noindex, nofollow` (con `canonical`). Si deseas captar búsquedas de clientes sobre funcionalidades concretas (OAuth2, nómina, retenciones), abrirlas a indexación es una buena oportunidad.

### Prioridad Baja
5. **Salto `h2 → h4` en el `<footer>`:** Los títulos de columna del footer usan `<h4>` directamente después de secciones `<h2>` (detalle menor de accesibilidad).
6. **Cuerpo de la página 404 personalizada en Apache:** `/Inicio/no-existe-test-404` devuelve `404` correcto, pero el servidor devolvió respuesta genérica en lugar del HTML de `/Inicio/404.html` (revisar `AllowOverride` en la configuración del VirtualHost si se desea que Apache muestre el diseño personalizado en errores 404).
