# Cómo publicar una página de versión

Plantilla viva: copiar [`2.1.59.html`](2.1.59.html). No crear el archivo desde cero ni tocar [`styles.css`](../styles.css) salvo que el usuario lo pida.

Esa página es el estándar oficial: nav y footer de la landing, listado lateral dinámico izquierdo (`#version-aside`), cabecera con versión y fecha integradas, y cuerpo con **pestañas interactivas unificadas** (Destacado, Nuevo, Mejoras, Correcciones). El CSS específico viaja en el `<style>` de la página, bajo `.version-notes`.

---

## Qué debe entregar el usuario

- **Número de versión** (ej. `2.1.60`)
- **Fecha de publicación** (ej. `17 de septiembre de 2026`)
- **Tipo**: `Menor`, `Mayor` o `Normativa`
- **Lista de cambios**: ya agrupados o en bruto (la IA los ordena y clasifica)

Si falta alguno de esos datos, preguntar antes de inventar.

---

## Archivos que se tocan (siempre)

1. **Nuevo archivo** `versiones/X.Y.Z.html` — copia de [`2.1.59.html`](2.1.59.html) con el contenido nuevo.
2. **[`versiones.js`](versiones.js)** — un objeto **al inicio** de `LISTOSOFT_VERSIONS`.
3. **[`components.js`](../components.js)** — `LATEST_VERSION_PATH = 'versiones/X.Y.Z.html'`.

No editar páginas de versiones anteriores. El listado izquierdo se construye dinámicamente desde `versiones.js`.

---

## Checklist paso a paso

1. Copiar `2.1.59.html` a `versiones/X.Y.Z.html`.
2. Reemplazar **todas** las apariciones del número de versión, fechas, meta tags, canonical y `data-version`.
3. Distribuir los cambios en las pestañas (`Destacado`, `Nuevo`, `Mejoras`, `Correcciones`) usando el formato estándar unificado de filas (`.change-row`). Omitir pestañas que no tengan ítems.
4. Actualizar los contadores numéricos de cada pestaña en el botón (`.version-tab-count` y `aria-label`).
5. Insertar el objeto de la versión al inicio de `LISTOSOFT_VERSIONS` en `versiones.js`.
6. Actualizar `LATEST_VERSION_PATH` en `components.js` apuntando a `versiones/X.Y.Z.html`.
7. Subir el `?v=` de `versiones.js` en la página nueva. Si cambió `components.js`, subir también ese `?v=` en el resto del sitio.

---

## Estándar visual y estructura del artículo

### 1. Cabecera y Fecha
- **Breadcrumb** (`.versions-breadcrumb`): Solo la ruta limpia:
  ```html
  <nav class="versions-breadcrumb" aria-label="Ruta">
      <a href="X.Y.Z.html">Versiones</a>
      <span aria-hidden="true">/</span>
      <span>X.Y.Z</span>
  </nav>
  ```
- **Encabezado con fecha integrada** (`.version-heading`): La fecha va **al lado de la versión** dentro del `h1`, con tamaño regular `0.95rem` y color atenuado (`.version-date`):
  ```html
  <h1 class="version-heading">
      LSoft <span class="version-heading-id">X.Y.Z</span>
      <span class="version-date">Publicado el <time datetime="YYYY-MM-DD">D de mes de YYYY</time></span>
  </h1>
  ```

### 2. Sistema de Pestañas (`.version-tabs`)
La navegación por pestañas es accesible con teclado (flechas, Home, End):
- Cuatro pestañas posibles:
  - **Destacado** (`id="tab-destacado"`, `aria-controls="panel-destacado"`, icono `fa-star`)
  - **Nuevo** (`id="tab-nuevo"`, `aria-controls="panel-nuevo"`, icono `fa-plus`)
  - **Mejoras** (`id="tab-mejoras"`, `aria-controls="panel-mejoras"`, icono `fa-arrow-up`)
  - **Correcciones** (`id="tab-correcciones"`, `aria-controls="panel-correcciones"`, icono `fa-wrench`, clase `.version-tab--correcciones`)
- Cada pestaña incluye su contador numérico sincronizado:
  ```html
  <span class="version-tab-count" aria-hidden="true">3</span>
  ```

### 3. Detalle unificado de cambios (`.change-feed` y `.change-row`)
**Todas las pestañas utilizan exactamente la misma estructura de tarjetas**. No usar viñetas desnudas ni grids de tarjetas cuadrados.

Cada cambio se maqueta como un `<article class="change-row">`:
```html
<div class="change-feed">
    <article class="change-row">
        <div class="change-row-icon">
            <i class="fa-solid fa-boxes-stacked" aria-hidden="true"></i>
        </div>
        <div class="change-row-body">
            <div class="change-row-meta">
                <span class="module-badge">Inventario</span>
            </div>
            <h3>Transferencias de inventario</h3>
            <p>Descripción clara y concisa en español impersonal, resaltando <strong>campos o módulos clave</strong> en negrita.</p>
        </div>
    </article>
</div>
```

**Reglas de contenido en las tarjetas**:
- **Icono lateral** (`.change-row-icon`): Icono Font Awesome alusivo al tema (bancos, inventario, reportes, sliders, cheques, etc.).
- **Badge de módulo** (`.module-badge`): Etiqueta en mayúsculas (`INVENTARIO`, `CONFIGURACIÓN`, `FACTURACIÓN`, `BANCOS Y TESORERÍA`, `TRIBUTACIÓN / SRI`, `SISTEMA`, etc.).
- **Sin etiqueta mini de tipo**: No agregar etiquetas mini de "Nuevo", "Mejora", etc. dentro de la tarjeta; la pestaña ya define la categoría.
- **Redacción**: Español impersonal («Se agrega», «Se optimiza», «Se valida», «Se corrige»).

---

## `versiones.js`: Registro de la nueva versión

Cada versión publicada requiere una entrada al inicio de `LISTOSOFT_VERSIONS`:

```js
{
    id: 'X.Y.Z',
    date: 'YYYY-MM-DD',           // YYYY-MM-DD, mismo día que <time datetime>
    dateLabel: 'D de mes de YYYY',
    type: 'Menor',                // Menor | Mayor | Normativa | Importante
    title: 'Resumen corto para listados',
    file: 'X.Y.Z.html'
}
```

---

## HTML: Qué reemplazar al crear una versión

| Dato | Dónde reemplazarlo |
|------|-------------------|
| **Número `X.Y.Z`** | `<title>`, `meta description`, `og:url`, `og:title`, `twitter:url`, `twitter:title`, `canonical`, `data-version`, breadcrumb `href` y texto, `h1 .version-heading-id` |
| **URL canónica** | `https://listosoft.com/Inicio/versiones/X.Y.Z` (sin `.html`) |
| **Fecha** | `<time datetime="YYYY-MM-DD">` y el texto legible en español dentro de `.version-date` |
| **Contadores de tabs** | `aria-label` y `.version-tab-count` en cada botón de pestaña |
| **Tarjetas** | Bloques `<article class="change-row">` dentro de cada `.change-feed` |
| **Rutas relativas** | `../styles.css`, `../components.js`, `versiones.js` |

---

## Qué no hacer

- **No romper la uniformidad de las pestañas**: Todas deben usar `.change-feed` y `.change-row`.
- **No añadir etiquetas mini tipo "Nuevo"** dentro de las tarjetas.
- **No separar la fecha en el breadcrumb** ni ponerla en un bloque huérfano; va integrada en el `h1` al lado de la versión.
- **No crear CSS global en `styles.css`** para una versión puntual; se mantiene en el `<style>` de la página.
- **No inventar cambios** que el usuario no entregó.
- **No olvidar sincronizar `components.js`** con `LATEST_VERSION_PATH`.
