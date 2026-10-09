# Cómo publicar una página de versión

Plantilla viva: copiar [`2.1.61.html`](2.1.61.html). No crear el archivo desde cero ni tocar [`styles.css`](../styles.css) salvo que el usuario lo pida.

Esa página es el estándar oficial:
1. **Hero superior fijo de ancho completo** (`<section class="version-hero-header">`): Fondo azul marino institucional (`#111c3a`), borde inferior dorado (`#d7b354`), breadcrumb corporativo y encabezado `H1` con el número de versión y la fecha de publicación integrada al lado en texto regular (sin negrita).
2. **Cuerpo principal con layout de dos columnas** (`<section class="version-release">`): Barra lateral dinámica izquierda (`#version-aside`) y área de notas derecha.
3. **Buscador de cambios instantáneo** (`.version-search-container`): Campo de búsqueda con filtrado en tiempo real y botón de limpiar.
4. **Pestañas interactivas corporativas** (`.version-tabs`): Destacado, Nuevo, Mejoras, Correcciones, con contadores numéricos reactivos y borde activo dorado.
5. **Detalle limpio de cambios sin iconos** (`.change-row`): Tarjetas directas con badge formal de módulo en tono dorado/ámbar, título en azul marino y redacción clara.

---

## Qué debe entregar el usuario

- **Número de versión** (ej. `2.1.62`)
- **Fecha de publicación** (ej. `20 de octubre de 2026`)
- **Tipo**: `Menor`, `Mayor` o `Normativa`
- **Lista de cambios**: ya agrupados o en bruto (la IA los ordena y clasifica)

Si falta alguno de esos datos, preguntar antes de inventar.

---

## Archivos que se tocan (siempre)

1. **Nuevo archivo** `versiones/X.Y.Z.html` — copia de [`2.1.61.html`](2.1.61.html) con el contenido nuevo.
2. **[`versiones.js`](versiones.js)** — un objeto **al inicio** de `LISTOSOFT_VERSIONS`.
3. **[`components.js`](../components.js)** — `LATEST_VERSION_PATH = 'versiones/X.Y.Z.html'`.

No editar páginas de versiones anteriores salvo petición expresa. El listado lateral se construye dinámicamente desde `versiones.js`.

---

## Checklist paso a paso

1. Copiar `2.1.61.html` a `versiones/X.Y.Z.html`.
2. Reemplazar **todas** las apariciones del número de versión, fechas, meta tags, canonical y `data-version`.
3. En el `h1` del Hero superior, actualizar el ID y la fecha al lado (sin negrita):
   ```html
   <h1>
       LSoft <span class="version-hero-id">X.Y.Z</span>
       <span class="version-hero-date">Publicado el <time datetime="YYYY-MM-DD">D de mes de YYYY</time></span>
   </h1>
   ```
4. Distribuir los cambios en las pestañas (`Destacado`, `Nuevo`, `Mejoras`, `Correcciones`) usando el formato estándar de filas sin iconos (`.change-row`). Omitir pestañas que no tengan ítems.
5. Actualizar los contadores numéricos de cada pestaña en el botón (`.version-tab-count` y `aria-label`).
6. Insertar el objeto de la versión al inicio de `LISTOSOFT_VERSIONS` en `versiones.js`.
7. Actualizar `LATEST_VERSION_PATH` en `components.js` apuntando a `versiones/X.Y.Z.html`.
8. Subir el `?v=` de `versiones.js` en la página nueva. Si cambió `components.js`, subir también ese `?v=` en el resto del sitio.

---

## Estándar visual y estructura del artículo

### 1. Hero Superior (`.version-hero-header`)
```html
<section class="version-hero-header">
    <div class="container">
        <nav class="version-hero-breadcrumb" aria-label="Ruta de navegación">
            <a href="../index.html">Inicio</a>
            <span class="sep">/</span>
            <a href="X.Y.Z.html">Notas de Versión</a>
            <span class="sep">/</span>
            <span class="current">vX.Y.Z</span>
        </nav>

        <h1>
            LSoft <span class="version-hero-id">X.Y.Z</span>
            <span class="version-hero-date">Publicado el <time datetime="YYYY-MM-DD">D de mes de YYYY</time></span>
        </h1>
    </div>
</section>
```

### 2. Buscador Instantáneo (`.version-search-container`)
```html
<div class="version-search-container">
    <div class="version-search-box">
        <i class="fa-solid fa-magnifying-glass version-search-icon" aria-hidden="true"></i>
        <input type="search" id="version-search-input" class="version-search-input"
            placeholder="Buscar cambios por módulo o palabra clave..."
            aria-label="Buscar en las notas de versión" autocomplete="off">
        <button type="button" id="version-search-clear" class="version-search-clear"
            aria-label="Limpiar búsqueda" hidden>
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
    </div>
</div>
```

### 3. Sistema de Pestañas (`.version-tabs`)
La navegación por pestañas es accesible con teclado (flechas, Home, End):
- Cuatro pestañas posibles:
  - **Destacado** (`id="tab-destacado"`, `aria-controls="panel-destacado"`)
  - **Nuevo** (`id="tab-nuevo"`, `aria-controls="panel-nuevo"`)
  - **Mejoras** (`id="tab-mejoras"`, `aria-controls="panel-mejoras"`)
  - **Correcciones** (`id="tab-correcciones"`, `aria-controls="panel-correcciones"`, clase `.version-tab--correcciones`)
- Cada pestaña incluye su contador numérico sincronizado:
  ```html
  <span class="version-tab-count" aria-hidden="true">3</span>
  ```

### 4. Detalle de cambios sin iconos (`.change-feed` y `.change-row`)
Cada cambio se maqueta como un bloque limpio sin contenedor de icono lateral:

```html
<div class="change-feed">
    <article class="change-row">
        <div class="change-row-meta">
            <span class="module-badge">Inventario</span>
        </div>
        <h3>Transferencias de inventario</h3>
        <p>Descripción clara y concisa en español impersonal, resaltando <strong>campos o módulos clave</strong> en negrita.</p>
    </article>
</div>
```

**Reglas de contenido en las tarjetas**:
- **Sin icono lateral**: No incluir `<div class="change-row-icon">`.
- **Badge de módulo** (`.module-badge`): Etiqueta en mayúsculas (`INVENTARIO`, `CONFIGURACIÓN`, `FACTURACIÓN`, `BANCOS Y TESORERÍA`, `TRIBUTACIÓN / SRI`, `NÓMINA`, `SISTEMA`, etc.).
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

## Qué no hacer

- **No usar la etiqueta `<header>` para el hero**: `styles.css` reserva `<header>` para el navbar fijo de la página; usar siempre `<section class="version-hero-header">`.
- **No añadir iconos laterales en las tarjetas**: Mantener las filas directas con `.module-badge`, `<h3>` y `<p>`.
- **No poner la fecha en negrita en el título**: Va con `font-weight: 400` y color suave.
- **No crear CSS global en `styles.css`** para una versión puntual; se mantiene en el `<style>` de la página.
- **No olvidar sincronizar `components.js`** con `LATEST_VERSION_PATH`.
