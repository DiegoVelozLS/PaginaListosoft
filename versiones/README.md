# Cómo publicar una página de versión

Plantilla viva: copiar [`2.1.59.html`](2.1.59.html). No crear el archivo desde cero ni tocar [`styles.css`](../styles.css) salvo que el usuario lo pida.

Esa página es el estándar: nav y footer de la landing, listado izquierdo, cabecera de versión y cuerpo con **cards** (destacado, novedades, mejoras, correcciones). El CSS de las cards viaja copiado en el `<style>` de la página, bajo `.version-notes`.

## Qué debe entregar el usuario

- Número de versión (`2.1.60`)
- Fecha de publicación
- Tipo: `Menor`, `Mayor` o `Normativa`
- Lista de cambios, ya agrupados o en bruto (la IA los ordena)

Si falta alguno de esos datos, preguntar antes de inventar.

## Archivos que se tocan (siempre)

1. **Nuevo** `versiones/X.Y.Z.html` — copia de [`2.1.59.html`](2.1.59.html) con el contenido nuevo.
2. **[`versiones.js`](versiones.js)** — un objeto **al inicio** de `LISTOSOFT_VERSIONS` (ver más abajo).
3. **[`components.js`](../components.js)** — `LATEST_VERSION_PATH` igual al archivo nuevo.

No editar páginas de versiones anteriores. El listado izquierdo se arma solo desde `versiones.js`.

## Checklist

1. Copiar `2.1.59.html` a `versiones/X.Y.Z.html`.
2. Reemplazar **todas** las apariciones del número, fechas, meta y `data-version`.
3. Reescribir lead y el cuerpo de notas (destacado, nuevo, mejoras, correcciones). Omitir secciones vacías.
4. Insertar la entrada nueva al inicio de `LISTOSOFT_VERSIONS`.
5. Actualizar `LATEST_VERSION_PATH` en `components.js`.
6. Subir el `?v=` de `versiones.js` en la página nueva (y en las demás que lo cargan). Si cambió `components.js`, subir también ese `?v=` en el resto del sitio.

## `versiones.js`: sí, cada versión nueva lleva un objeto

Cada versión publicada necesita **un objeto** al inicio de `LISTOSOFT_VERSIONS`. Sin esa entrada, la página existe pero **no aparece** en el listado izquierdo ni queda enlazada desde el menú (el menú usa `LATEST_VERSION_PATH`).

No hay que tocar el resto del archivo (las funciones). Solo añadir el bloque y dejar las entradas viejas debajo.

```js
{
    id: '2.1.60',
    date: '2026-10-03',           // YYYY-MM-DD, mismo día que <time datetime>
    dateLabel: '3 de octubre de 2026',
    type: 'Menor',                // Menor | Mayor | Normativa
    title: 'Resumen corto para listados',
    file: '2.1.60.html'
}
```

Qué hace cada campo:

| Campo | Uso |
|-------|-----|
| `id` | Número que se muestra en el listado. Debe coincidir con `data-version` del HTML. |
| `date` | Fecha ISO. El listado agrupa por el año de este campo. |
| `dateLabel` | La misma fecha, en español. |
| `type` | `Menor`, `Mayor` o `Normativa`. |
| `title` | Resumen corto (referencia interna / listados). |
| `file` | Nombre del HTML en esta carpeta. |

`date` y `dateLabel` deben describir el mismo día.

## HTML: qué reemplazar

| Dato | Dónde |
|------|--------|
| Número `X.Y.Z` | `<title>`, `og`/`twitter`, canonical, `data-version`, breadcrumb, `h1` |
| URL canónica | `https://listosoft.com/Inicio/versiones/X.Y.Z` (sin `.html`) |
| Fecha | `.version-date` + `<time datetime="YYYY-MM-DD">` en español |
| Tipo | `.version-badge`: «Versión menor», «Versión mayor». Si es normativa, añadir `version-badge--normativa` y el texto «Normativa» |
| Lead | Un párrafo en `.version-lead` (qué cambió, no una lista) |
| `robots` | `noindex, nofollow` |
| Rutas | `../styles.css`, `../components.js`, `versiones.js` (esta carpeta) |

`body` siempre: `class="version-page" data-version="X.Y.Z"`.

El aside izquierdo (`#version-aside`) se deja **vacío**: lo rellena `versiones.js`.

Copiar también el `<style>` de `.version-notes`. No extraerlo a `styles.css`.

## Estructura del artículo (no cambiar el layout)

Nav y footer de la landing. Dos columnas: listado (`#version-aside`) y contenido (`version-main`). La cabecera usa `versions-breadcrumb`, `version-heading`, `version-meta` y `version-lead`.

«En esta página» (`#version-toc`) es opcional; en la plantilla actual va comentado.

Secciones del cuerpo, en este orden, **solo si hay ítems**:

1. Destacado (`.highlights`) — cards
2. Nuevo (`.change`, con `details` opcional)
3. Mejoras (`.compact-grid`)
4. Correcciones (`.compact-grid`)

Los `h2` usan `version-change-group` (iconos Font Awesome, sin emoji de título).

- Español impersonal («Se agrega», «Se valida»).
- Campos, permisos y parámetros van en `<strong>` dentro del texto.
- No poner capturas salvo que el usuario las pida.

## Qué no hacer

- No quitar las cards ni volver a un listado plano.
- No poner imágenes o placeholders.
- No crear CSS global en `styles.css` para una versión puntual.
- No inventar cambios que el usuario no dio.
- No dejar `data-version` o el canonical apuntando a la versión anterior.
- No reescribir `versiones.js` entero: solo el objeto nuevo al inicio.
